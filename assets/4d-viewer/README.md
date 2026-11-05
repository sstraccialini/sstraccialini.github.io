# 4D viewer data

Every reconstruction lives in its own folder next to `index.html`, holding a
`manifest.json` and a `frames/` directory in S4D1 format (as written by
`convert_npz_to_web.py`). Name the folder `<scene>_<frames>_<resolution>`,
for example `ADT_video_cut_80_512` = 80 extracted frames at 512 px.

To add a reconstruction:

1. Convert it into a new folder, e.g. `assets/4d-viewer/ADT_video_cut_80_512_fused/`.
2. Add an entry to `datasets.json`:

```json
{
  "id": "ADT_video_cut_80_512_fused",
  "path": "ADT_video_cut_80_512_fused",
  "label": "ADT video cut · fused",
  "representation": "fused",
  "frames": 80,
  "resolution": 512,
  "description": "ICP-registered, voxel-fused static map"
}
```

Fields:

- `id`: unique key, also used in the URL (`?data=<id>`).
- `path`: folder name, relative to this directory.
- `label`: name shown on the switcher button.
- `representation`: `raw` for independent per-frame clouds, `fused` for cumulative
  snapshots (fused snapshots already contain the history, so the viewer locks
  Time mode to Frame).
- `frames`: number of frames extracted from the video.
- `resolution`: input resolution of the extracted frames, in px.
- `description`: optional, a short line shown under the switcher.

`default` at the top of `datasets.json` picks the reconstruction that opens first.
