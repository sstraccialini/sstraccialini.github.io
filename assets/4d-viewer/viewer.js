import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// S4D1 format: 8-byte header (magic + point count); 20 bytes per point:
// little-endian float32 xyz (12), uint8 RGB (3), uint8 instance RGB (3), uint16 instance ID (2).
const STRIDE = 20;
const MAX_VISIBLE_POINTS = 900_000;
const MAX_CACHE_FRAMES = 20;
const $ = id => document.getElementById(id);
const ui = Object.fromEntries([
  'viewport','loading','loadingTitle','loadingDetail','frameCount','pointTotal',
  'dataBadge','frameMeta','timestamp','timeline','prev','next','play','fps','loop',
  'colorControls','colorDesc','modeControls','windowRow','windowSize','windowValue',
  'pointSize','pointSizeValue','backgroundToggle','resetCamera','visiblePoints',
  'visibleFrames','sourceFrame','footerNote','datasetControls','datasetDesc','modeDesc',
  'fadeToggle','accumulateDesc',
].map(id => [id, $(id)]));

let catalog = null, dataset = null, manifest = null; // datasets.json, active entry, its manifest
let renderer, scene, camera, controls, material, cloudGroup;
let cloudCenter = [0, 0, 0], cloudScale = 1;
let currentFrame = -1, displayedMode = null, generation = 0;
let playing = false, playTimer = null;
let displayed = []; // {index, points, count}
const frameCache = new Map(); // LRU for decoded binary frames, keyed by dataset id and frame
let colorMode = 'rgb', viewMode = 'frame', requestedMode = 'frame';

function fmt(n) { return Number(n || 0).toLocaleString('en-US'); }
function setLoading(title, detail = '', failed = false) {
  ui.loading.hidden = false;
  ui.loading.classList.toggle('failed', failed);
  ui.loadingTitle.textContent = title;
  ui.loadingDetail.textContent = detail;
}
function hideLoading() { ui.loading.hidden = true; }
function fail(error) {
  console.error(error);
  setLoading('Unable to load point clouds',
    `${error.message}\nCheck datasets.json, the dataset manifest and the browser console. Run this page through a local HTTP server, not file://.`, true);
  ui.dataBadge.textContent = 'Data error';
  ui.dataBadge.classList.add('error');
}

// Relative paths work on custom domains and GitHub project subpaths.
function dataUrl(entry, file) { return new URL(`./${entry.path}/${file}`, import.meta.url); }

async function getFrame(index) {
  const key = `${dataset.id}:${index}`;
  if (frameCache.has(key)) {
    const existing = frameCache.get(key);
    frameCache.delete(key); frameCache.set(key, existing);
    return existing;
  }
  // Snapshot the normalization: a dataset switch may happen while fetching.
  const center = cloudCenter, scale = cloudScale;
  const file = manifest.frames[index].file;
  const url = dataUrl(dataset, file);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Cannot fetch ${file} (HTTP ${response.status})`);
  const buffer = await response.arrayBuffer();
  const data = new DataView(buffer);
  if (buffer.byteLength < 8 || String.fromCharCode(...new Uint8Array(buffer, 0, 4)) !== 'S4D1') {
    throw new Error(`Unsupported frame file: ${file}`);
  }
  const count = data.getUint32(4, true);
  if (buffer.byteLength !== 8 + count * STRIDE) {
    throw new Error(`Corrupted frame file: ${file}`);
  }
  const xyz = new Float32Array(count * 3);
  const rgb = new Uint8Array(count * 3);
  const instanceRgb = new Uint8Array(count * 3);
  const ids = new Uint16Array(count);
  let o = 8;
  for (let i = 0; i < count; i++) {
    const j = i * 3;
    xyz[j] = (data.getFloat32(o, true) - center[0]) * scale;
    xyz[j + 1] = (data.getFloat32(o + 4, true) - center[1]) * scale;
    xyz[j + 2] = (data.getFloat32(o + 8, true) - center[2]) * scale;
    rgb[j] = data.getUint8(o + 12);
    rgb[j + 1] = data.getUint8(o + 13);
    rgb[j + 2] = data.getUint8(o + 14);
    instanceRgb[j] = data.getUint8(o + 15);
    instanceRgb[j + 1] = data.getUint8(o + 16);
    instanceRgb[j + 2] = data.getUint8(o + 17);
    ids[i] = data.getUint16(o + 18, true);
    o += STRIDE;
  }
  const decoded = { xyz, rgb, instanceRgb, ids, count };
  frameCache.set(key, decoded);
  while (frameCache.size > MAX_CACHE_FRAMES) frameCache.delete(frameCache.keys().next().value);
  return decoded;
}

function createPoints(frame, index) {
  const keepBackground = ui.backgroundToggle.checked;
  let count = frame.count;
  if (!keepBackground) {
    count = 0;
    for (const id of frame.ids) if (id !== 0) count++;
  }
  const xyz = new Float32Array(count * 3);
  const rgb = new Uint8Array(count * 3);
  const instances = new Uint8Array(count * 3);
  let j = 0;
  for (let i = 0; i < frame.count; i++) {
    if (!keepBackground && frame.ids[i] === 0) continue;
    const a = i * 3, b = j * 3;
    xyz[b] = frame.xyz[a]; xyz[b + 1] = frame.xyz[a + 1]; xyz[b + 2] = frame.xyz[a + 2];
    rgb[b] = frame.rgb[a]; rgb[b + 1] = frame.rgb[a + 1]; rgb[b + 2] = frame.rgb[a + 2];
    instances[b] = frame.instanceRgb[a]; instances[b + 1] = frame.instanceRgb[a + 1]; instances[b + 2] = frame.instanceRgb[a + 2];
    j++;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(xyz, 3));
  geometry.userData.rgb = new THREE.Uint8BufferAttribute(rgb, 3, true);
  geometry.userData.instance = new THREE.Uint8BufferAttribute(instances, 3, true);
  geometry.setAttribute('color', colorMode === 'rgb' ? geometry.userData.rgb : geometry.userData.instance);
  // Each cloud gets its own material so window mode can fade it independently.
  const points = new THREE.Points(geometry, material.clone());
  points.frustumCulled = false;
  points.renderOrder = index; // older frames blend first
  cloudGroup.add(points);
  displayed.push({index, points, count});
}

function disposeCloud({points}) {
  cloudGroup.remove(points);
  points.geometry.dispose();
  points.material.dispose();
}
function removeFirst() {
  const first = displayed.shift();
  if (first) disposeCloud(first);
}
function clearClouds() {
  while (displayed.length) removeFirst();
}
// Accumulate overlays the whole history but caps the point budget: once frames 0..index
// exceed MAX_VISIBLE_POINTS, only every `stride`-th frame (plus the current one) is kept,
// so the overlay still spans the entire video instead of only its most recent part.
function accumulateStride(index) {
  let sum = 0;
  for (let k = 0; k <= index; k++) sum += manifest.frames[k].count;
  return Math.max(1, Math.ceil(sum / MAX_VISIBLE_POINTS));
}
function accumulateFrames(index) {
  const stride = accumulateStride(index);
  const frames = [];
  for (let k = 0; k < index; k += stride) frames.push(k);
  frames.push(index);
  return frames;
}
function trimVisible(index) {
  if (viewMode === 'frame') {
    while (displayed.length > 1) removeFirst();
  } else if (viewMode === 'window') {
    while (displayed.length > Number(ui.windowSize.value)) removeFirst();
  } else {
    const stride = accumulateStride(index);
    displayed = displayed.filter(entry => {
      const keep = entry.index === index || entry.index % stride === 0;
      if (!keep) disposeCloud(entry);
      return keep;
    });
  }
}
// In window mode, older frames fade out linearly so motion leaves a trail.
function applyFade(index) {
  const fade = viewMode === 'window' && ui.fadeToggle.checked;
  const size = Number(ui.windowSize.value);
  for (const {index: k, points} of displayed) {
    const opacity = fade ? 1 - (index - k) / size : 1;
    const transparent = opacity < 1;
    if (points.material.transparent !== transparent) points.material.needsUpdate = true;
    points.material.transparent = transparent;
    points.material.depthWrite = !transparent;
    points.material.opacity = opacity;
  }
}
function updateStats(index) {
  const info = manifest.frames[index];
  const timeText = typeof info.time_seconds === 'number' && Number.isFinite(info.time_seconds)
    ? ` · ${info.time_seconds.toFixed(2)} s` : '';
  ui.timestamp.textContent = `Frame ${index + 1} / ${manifest.frames.length}${timeText}`;
  ui.frameMeta.textContent = `Frame ${index + 1}`;
  ui.sourceFrame.textContent = info.source_frame_index ?? info.frame_index ?? index;
  ui.visiblePoints.textContent = fmt(displayed.reduce((n, x) => n + x.count, 0));
  ui.visibleFrames.textContent = displayed.length;
  const stride = viewMode === 'accumulate' ? accumulateStride(index) : 1;
  ui.accumulateDesc.hidden = stride === 1;
  ui.accumulateDesc.textContent = `Long history: showing 1 in every ${stride} frames to stay under ${fmt(MAX_VISIBLE_POINTS)} points`;
  ui.timeline.value = index;
}

async function showFrame(index, {force = false} = {}) {
  if (!manifest) return;
  index = Math.min(Math.max(Math.round(index), 0), manifest.frames.length - 1);
  const request = ++generation;
  const sequential = !force && index === currentFrame + 1 && displayedMode === viewMode;
  if (!sequential) {
    clearClouds();
    let frames = [index];
    if (viewMode === 'window') {
      frames = [];
      for (let k = Math.max(0, index - Number(ui.windowSize.value) + 1); k <= index; k++) frames.push(k);
    }
    if (viewMode === 'accumulate') frames = accumulateFrames(index);
    for (const k of frames) {
      const frame = await getFrame(k);
      if (generation !== request) return;
      createPoints(frame, k);
    }
  } else {
    const frame = await getFrame(index);
    if (generation !== request) return;
    createPoints(frame, index);
  }
  if (generation !== request) return;
  trimVisible(index);
  applyFade(index);
  currentFrame = index;
  displayedMode = viewMode;
  updateStats(index);
  hideLoading();
}

function setPlaying(next) {
  playing = next;
  if (playTimer !== null) { clearTimeout(playTimer); playTimer = null; }
  ui.play.textContent = playing ? 'Pause' : 'Play';
  ui.play.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
  if (playing) scheduleNext();
}
function scheduleNext() {
  if (!playing) return;
  playTimer = setTimeout(async () => {
    if (!playing) return;
    let next = currentFrame + 1;
    if (next >= manifest.frames.length) {
      if (!ui.loop.checked) {setPlaying(false); return;}
      next = 0;
    }
    try {await showFrame(next);} catch (error) {setPlaying(false); fail(error); return;}
    scheduleNext();
  }, 1000 / Number(ui.fps.value));
}
function updateColor(next) {
  colorMode = next;
  for (const {points} of displayed) {
    const geometry = points.geometry;
    geometry.setAttribute('color', geometry.userData[colorMode === 'rgb' ? 'rgb' : 'instance']);
  }
  ui.colorDesc.textContent = colorMode === 'rgb' ? 'Original camera colors' : 'Persistent S4VY object identities';
  for (const button of ui.colorControls.querySelectorAll('button')) {
    const active = button.dataset.color === colorMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}
function updateMode(next, {render = true} = {}) {
  setPlaying(false);
  requestedMode = next;
  // Fused snapshots are cumulative already: overlaying them would duplicate geometry.
  const fused = dataset?.representation === 'fused';
  if (fused) next = 'frame';
  viewMode = next;
  ui.modeDesc.hidden = !fused;
  ui.windowRow.hidden = next !== 'window';
  for (const button of ui.modeControls.querySelectorAll('button')) {
    const active = button.dataset.mode === next;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.disabled = fused && button.dataset.mode !== 'frame';
  }
  if (render) showFrame(Math.max(0, currentFrame), {force: true}).catch(fail);
}
function resetView() {
  camera.position.set(3.5, 2.7, 5.7);
  controls.target.set(0, 0, 0);
  camera.up.set(0, 1, 0);
  controls.update();
}
// Roll the camera about its viewing direction, preserving the orbit target.
// OrbitControls handles normal drag (orbit), and Ctrl/Cmd-drag (pan).
function rollView(angle) {
  const viewAxis = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
  if (viewAxis.lengthSq() === 0) return;
  camera.up.applyAxisAngle(viewAxis, angle).normalize();
  camera.lookAt(controls.target);
  controls.update();
}

function enableRollDrag() {
  const canvas = renderer.domElement;
  let activePointer = null;
  let lastX = 0;

  // Capture Shift+left drag before OrbitControls interprets Shift as pan.
  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.shiftKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    activePointer = event.pointerId;
    lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('rolling');
  }, true);

  canvas.addEventListener('pointermove', event => {
    if (event.pointerId !== activePointer) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    rollView(dx / Math.max(canvas.clientWidth, 1) * Math.PI * 2);
  }, true);

  const endRoll = event => {
    if (event.pointerId !== activePointer) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    activePointer = null;
    canvas.classList.remove('rolling');
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };
  canvas.addEventListener('pointerup', endRoll, true);
  canvas.addEventListener('pointercancel', endRoll, true);
  canvas.addEventListener('lostpointercapture', event => {
    if (event.pointerId === activePointer) {
      activePointer = null;
      canvas.classList.remove('rolling');
    }
  });
}

function setupScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x171717, 1);
  ui.viewport.prepend(renderer.domElement);
  renderer.domElement.style.touchAction = 'none';
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.25;
  controls.maxDistance = 70;
  enableRollDrag();
  material = new THREE.PointsMaterial({size: 0.026, vertexColors: true, sizeAttenuation: true, transparent: false});
  cloudGroup = new THREE.Group();
  scene.add(cloudGroup);
  resetView();
  const observer = new ResizeObserver(() => {
    const w = ui.viewport.clientWidth, h = ui.viewport.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  observer.observe(ui.viewport);
  function tick() {
    requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  }
  tick();
}
function wireControls() {
  ui.play.addEventListener('click', () => setPlaying(!playing));
  ui.prev.addEventListener('click', () => {setPlaying(false); showFrame(currentFrame - 1).catch(fail);});
  ui.next.addEventListener('click', () => {setPlaying(false); showFrame(currentFrame + 1).catch(fail);});
  ui.timeline.addEventListener('input', () => {
    setPlaying(false);
    showFrame(Number(ui.timeline.value)).catch(fail);
  });
  for (const button of ui.colorControls.querySelectorAll('button'))
    button.addEventListener('click', () => updateColor(button.dataset.color));
  for (const button of ui.modeControls.querySelectorAll('button'))
    button.addEventListener('click', () => updateMode(button.dataset.mode));
  ui.windowSize.addEventListener('input', () => {
    ui.windowValue.textContent = ui.windowSize.value;
    if (viewMode === 'window') showFrame(Math.max(0, currentFrame), {force: true}).catch(fail);
  });
  ui.fadeToggle.addEventListener('change', () => applyFade(currentFrame));
  ui.pointSize.addEventListener('input', () => {
    material.size = 0.011 + Number(ui.pointSize.value) * 0.005;
    for (const {points} of displayed) points.material.size = material.size;
    ui.pointSizeValue.textContent = ui.pointSize.value;
  });
  ui.backgroundToggle.addEventListener('change', () => showFrame(Math.max(0, currentFrame), {force: true}).catch(fail));
  ui.resetCamera.addEventListener('click', resetView);
  window.addEventListener('keydown', e => {
    if (['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.code === 'Space') {e.preventDefault(); setPlaying(!playing);}
    if (e.code === 'ArrowLeft') {setPlaying(false);showFrame(currentFrame - 1).catch(fail);}
    if (e.code === 'ArrowRight') {setPlaying(false);showFrame(currentFrame + 1).catch(fail);}
    if (e.key?.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) rollView(Math.PI);
    if (e.key?.toLowerCase() === 'r') updateColor('rgb');
    if (e.key?.toLowerCase() === 'i') updateColor('instance');
  });
}

const REPRESENTATIONS = {raw: 'Per-frame clouds', fused: 'Fused snapshots'};

function describeDataset(entry) {
  return [
    entry.frames && `${entry.frames} frames`,
    entry.resolution && `${entry.resolution} px`,
    REPRESENTATIONS[entry.representation] || entry.representation,
    entry.description,
  ].filter(Boolean).join(' · ');
}

function renderDatasetButtons() {
  ui.datasetControls.replaceChildren(...catalog.datasets.map(entry => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = entry.id;
    button.textContent = entry.label || entry.id;
    button.title = describeDataset(entry);
    button.addEventListener('click', () => {
      if (entry.id !== dataset?.id) loadDataset(entry.id).catch(fail);
    });
    return button;
  }));
}

async function loadDataset(id) {
  const entry = catalog.datasets.find(d => d.id === id) || catalog.datasets[0];
  setPlaying(false);
  generation++; // cancels any frame load still in flight for the previous dataset
  manifest = null;
  dataset = entry;
  for (const button of ui.datasetControls.querySelectorAll('button')) {
    const active = button.dataset.id === entry.id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  ui.datasetDesc.textContent = describeDataset(entry);
  ui.dataBadge.classList.remove('error');
  setLoading('Loading point clouds...', `Reading ${entry.path}/manifest.json`);

  const response = await fetch(dataUrl(entry, 'manifest.json'), {cache: 'no-store'});
  if (!response.ok) throw new Error(`${entry.path}/manifest.json returned HTTP ${response.status}`);
  const next = await response.json();
  if (dataset !== entry) return; // switched again meanwhile
  if (!Array.isArray(next.frames) || !next.frames.length || next.format !== 'S4D1')
    throw new Error(`Invalid ${entry.path}/manifest.json (expected S4D1 with a nonempty frames array)`);
  manifest = next;
  const bounds = manifest.bounds || {};
  cloudCenter = bounds.center || [0, 0, 0];
  cloudScale = 4 / Math.max(Number(bounds.diagonal) || 1, 0.00001);

  const url = new URL(location.href);
  url.searchParams.set('data', entry.id);
  history.replaceState(null, '', url);

  ui.frameCount.textContent = fmt(manifest.frames.length);
  ui.pointTotal.textContent = fmt(manifest.frames.reduce((sum, frame) => sum + frame.count, 0));
  ui.dataBadge.textContent = manifest.sample ? 'Sample dataset' : (entry.label || entry.id);
  ui.timeline.max = manifest.frames.length - 1;
  ui.timeline.disabled = false;
  ui.prev.disabled = false;ui.next.disabled = false;ui.play.disabled = false;
  ui.footerNote.textContent = manifest.sample ? 'Sample data (replace with your exported point clouds).' : '';
  updateColor(colorMode);
  if (manifest.has_rgb === false) {
    ui.colorDesc.textContent = 'RGB unavailable: using instance colors';
  }
  updateMode(requestedMode, {render: false});
  // Keep the current frame (and camera) so reconstructions can be compared directly.
  await showFrame(Math.max(0, currentFrame), {force: true});
}

async function start() {
  try {
    setupScene(); wireControls();
    const response = await fetch(new URL('./datasets.json', import.meta.url), {cache: 'no-store'});
    if (!response.ok) throw new Error(`datasets.json returned HTTP ${response.status}`);
    catalog = await response.json();
    if (!Array.isArray(catalog.datasets) || !catalog.datasets.length)
      throw new Error('datasets.json has no datasets');
    renderDatasetButtons();
    const requested = new URLSearchParams(location.search).get('data');
    await loadDataset(requested || catalog.default);
  } catch (error) {fail(error);}
}
start();
