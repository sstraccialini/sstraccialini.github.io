export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  paperUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'AI/ML' | 'Web Development' | 'Mobile' | 'Data Science' | 'Other';
  date: string;
  status: 'completed' | 'in-progress' | 'planning';
}

export const projects: Project[] = [
  {
    id: 'k-means-heuristics',
    title: 'An exploration of novel heuristics for efficient and accurate k-means clustering',
    description: 'Bachelor\'s thesis project exploring novel heuristics for efficient and accurate k-means clustering, including a proposed extended-Hartigan algorithm and its empirical evaluation.',
    longDescription: `
<h3>Abstract</h3>

<i>K</i>-means is one of the most widely-used algorithms to perform clustering and exploratory data analysis, since it allows identifying relevant patterns in data. Its objective is to partition a set of observations into a predetermined number of clusters, by minimizing the within-cluster sum of squares (WCSS). However, this optimization problem is NP-hard, necessitating the use of heuristic algorithms for practical applications. The most common heuristic, Lloyd's algorithm, is simple and efficient, but at the same time it is highly susceptible to converging to suboptimal local minima, with its performance being heavily dependent on the centroids' initial positions. While alternatives, such as Hartigan's algorithm, have been proven to find better (lower-cost) solutions, they are often significantly slower and more computationally intensive.
<br/><br/>
This thesis introduces and evaluates a novel heuristic, "extended-Hartigan", designed to bridge this gap by reducing the computational complexity of the standard Hartigan's method while retaining its ability to find high-quality clusterings. The proposed algorithm deviates from the standard single-point update rule. Instead, it first identifies all candidate data points whose reassignment would individually decrease the total cost, following Hartigan's procedure, and then attempts to apply this entire list of reassignments in a single "unsafe" batch update. If this aggressive update fails to lower the overall cost, the algorithm reverts the changes and proceeds in a "safe" mode, accepting a limited subset of non-conflicting reassignments to guarantee a monotonic cost reduction in that iteration.
<br/><br/>
To validate this approach, we conduct an empirical study comparing extended-Hartigan and its hybrid "mixed-mode" variants against the classical Lloyd's and Hartigan's algorithms. The evaluation spans several benchmark datasets, which feature diverse numbers of samples, dimensions, and cluster counts. The comparison is performed using multiple initialization techniques, including maximin, 
<i>k-means++</i>, and greedy <i>k-means++</i>, and performance is assessed based on the final cost, computational efficiency, and clustering stability. The results demonstrate that the proposed methods consistently find clusterings with a lower final cost than Lloyd's algorithm, achieving a significant cost reduction on the most complex datasets. Moreover, extended-Hartigan avoids the computational instability inherent in the standard Hartigan algorithm, showing a cost profile closer to the efficient Lloyd's baseline and successfully preventing extreme cost increases. The findings indicate that the extended-Hartigan algorithm is a robust and efficient alternative that successfully balances the trade-off between solution quality and computational expense, offering a practical and powerful alternative for <i>k-means</i> clustering.
<br/>
<h3>Extended-Hartigan pseudocode</h3>
One of the main contribution of this work is the algorithm we called extended-Hartigan. Here follows its pseudocode.
<br/>
<pre><code>choose k = number of centroids

assign points to each centroid randomly
move the centroid to the mean of points assigned to it

repeat:
    for each datapoint d ∈ c
        for each centroid c' ≠ c
            compute Δcost(d; c → c')
            | if result is negative, store in a candidates list
            | if candidate is already in list keep the reassignment with minimum Δcost
        end for
    end for

    if "unsafe mode":
        accept all candidates
        if overall cost did not decrease
            revert changes and proceed in "safe mode"
    else if "safe mode"
        sort all candidates (minimum first)
        accept them in order if the corresponding clusters have not been involved
 
until convergence
</code></pre>

<h3>Datasets</h3>
The main datasets used in this work where A-Sets from a research project by Karkkainen and Franti [KF02], Bridge and House, from a work by Franti, Rezaei, and Zhao [FRZ14]. These, and other datasets which are used for clustering tasks, are available in the following website: https://cs.joensuu.fi/sipu/datasets/.
<br/>

<h3>References</h3>
<ul>
<li>[AV07] David Arthur and Sergei Vassilvitskii. “K-Means++: The Advantages of Careful Seeding”. In: vol. 8. Jan. 2007, pp. 1027–1035. doi: 10.1145/1283383.1283494.</li>

<li>[Bha+19] Anup Bhattacharya et al. Noisy, Greedy and Not So Greedy k-means++. Dec. 2019. doi: 10.48550/arXiv.1912.00653. url: http://arxiv.org/abs/1912.00653.</li>

<li>[Elk03] Charles Elkan. “Using the triangle inequality to accelerate k-means”. In: Proceed- ings of the Twentieth International Conference on International Conference on Machine Learning. ICML’03. Washington, DC, USA: AAAI Press, 2003, pp. 147– 153. isbn: 1577351894.</li>

<li>[FRZ14] Pasi Franti, Mohammad Rezaei, and Qinpei Zhao. “Centroid index: Cluster level similarity measure”. en. In: Pattern Recognition 47.9 (Sept. 2014), pp. 3034– 3045. issn: 00313203. doi: 10 . 1016 / j . patcog . 2014 . 03 . 017. url: https://linkinghub.elsevier.com/retrieve/pii/S0031320314001150.</li>

<li>[Gru+22] Christoph Grunau et al. A Nearly Tight 0Analysis of Greedy k-means++. July 2022. doi: 10.48550/arXiv.2207.07949. url: http://arxiv.org/abs/2207.07949.</li>

<li>[Har75] John A. Hartigan. Clustering algorithms. eng. A Wiley publication in applied statistics. New York: Wiley, 1975. isbn: 9780471356455.</li>

<li>[HW79] J. A. Hartigan and M. A. Wong. “Algorithm AS 136: A K-Means Clustering Algo- rithm”. In: Journal of the Royal Statistical Society. Series C (Applied Statistics) 28.1 (1979), pp. 100–108. issn: 00359254, 14679876. url: http://www.jstor.org/stable/2346830.</li>

<li>[KF02] Ismo Karkkainen and Pasi Franti. Dynamic local search algorithm for the cluster- ing problem. eng. Report series / University of Joensuu, Department of Computer Science. A, 2002-6. OCLC: 58380784. Joensuu: University of Joensuu, 2002. isbn: 9789524581431.</li>

<li>[Llo82] S. Lloyd. “Least squares quantization in PCM”. en. In: IEEE Transactions on Information Theory 28.2 (Mar. 1982), pp. 129–137. issn: 0018-9448. doi: 10. 1109 / TIT . 1982 . 1056489. url: http://ieeexplore.ieee.org/document/1056489/.</li>

<li>[NF16] James Newling and Francois Fleuret. “Fast k-means with accurate bounds”. en. In: Proceedings of The 33rd International Conference on Machine Learning. PMLR, June 2016, pp. 936–944. url: https://proceedings.mlr.press/v48/newling16.html.</li>

<li>[SB14] Shai Shalev-Shwartz and Shai Ben-David. Understanding machine learning: from theory to algorithms. eng. New York: Cambridge university press, 2014. isbn: 9781107057135.</li>

<li>[Sci] Scikit-learn. KMeans. en. url: https://scikit-learn/stable/modules/generated/sklearn.cluster.KMeans.html.</li>

<li>[TV10] Matus Telgarsky and Andrea Vattani. “Hartigan’s Method: k-means Clustering without Voronoi”. In: Proceedings of the Thirteenth International Conference on Artificial Intelligence and Statistics. Ed. by Yee Whye Teh and Mike Titterington. Vol. 9. Proceedings of Machine Learning Research. Chia Laguna Resort, Sardinia, Italy: PMLR, May 2010, pp. 820–827. url: https://proceedings.mlr.press/v9/telgarsky10a.html.</li>

<li>[Wu+08] Xindong Wu et al. “Top 10 algorithms in data mining”. en. In: Knowledge and Information Systems 14.1 (Jan. 2008), pp. 1–37. issn: 0219-1377, 0219-3116. doi: 10.1007/s10115-007-0114-2. url: http://link.springer.com/10.1007/s10115-007-0114-2.</li>

<li>[Xia+22] Shuyin Xia et al. “Ball kk-Means: Fast Adaptive Clustering With No Bounds”. In: IEEE Transactions on Pattern Analysis and Machine Intelligence 44.1 (Jan. 2022), pp. 87–99. issn: 1939-3539. doi: 10.1109/TPAMI.2020.3008694. url: https://ieeexplore.ieee.org/document/9139397.</li>
</ul>

`,
    technologies: ['Python', 'scikit-learn', 'optimization', ' ML'],
    githubUrl: 'https://github.com/sstraccialini/k-means',
    paperUrl: 'https://github.com/sstraccialini/k-means/blob/main/Tesi-final.pdf',
    // demoUrl: 'https://ai-task-manager.vercel.app',
    // imageUrl: '/assets/images/projects/ai-task-manager.jpg',
    featured: true,
    category: 'AI/ML',
    date: '2025-07',
    status: 'completed'
  },
  {
    id: 'SuBERT',
    title: 'SuBERT',
    description: 'An end-to-end pipeline for recognizing and translating ancient Sumerian cuneiform using computer vision and Transformer-based models.',
    longDescription: `
<h3>Abstract</h3>
Recent advances in computer vision and natural language processing open new possibilities for reading and translating ancient cuneiform texts: in this work, we tackle one of the most ancient and obscure languages, spoken by the Sumerians, a grandiose civilization that flour- ished in the Near East around 2000 BCE and vanished millennia ago, leaving us with only a few scant testimonies. We focus on two main tasks: first, we exploit image-classification techniques to isolate and recognize individual characters from high-resolution tablet images. Then, we attempt to translate Sumerian into English via Transformer-like architectures.
<br/>
<h3>Datasets</h3>
Our project utilizes the SumTablets dataset (Version v1), a dataset curated by Cole Simmons, Richard Diehl Martinez, and Prof. Dan Jurafsky (2024). This resource, available from their GitHub repository and distributed though HuggingFace, is licensed under the Creative Commons Attribution 4.0 International, allowing for its adaptation and reuse with proper credit. You can read more about their work in the GitHub repository and in the related paper: SumTablets: A Transliteration Dataset of Sumerian Tablets (Simmons et al., ML4AL 2024).
`,
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'BART', 'GPT', 'YOLO', 'FR-CNN'],
    githubUrl: 'https://github.com/sstraccialini/AI-project-SuBERT',
    paperUrl: 'https://github.com/sstraccialini/AI-project-SuBERT/blob/main/SuBERT-project_report.pdf',
    imageUrl: '/assets/images/projects/SuBERT.jpg',
    featured: true,
    category: 'AI/ML',
    date: '2025-05',
    status: 'completed'
  },
  {
    id: 'escape-particle-bm',
    title: 'Escape of a Particle from an Intracellular Region (Brownian Motion)',
    description: 'Cross-platform mobile app with machine learning-based workout recommendations and form analysis.',
    longDescription: `
<p>A computational study of Brownian motion escape dynamics in confined circular domains.</p>
<p>This research was developed as part of the course <code>30561 Stochastic Processes and Simulations in Natural Sciences</code>, Bocconi University.</p>
<h3 id="overview">Overview</h3>
<p>This project investigates the escape dynamics of a particle undergoing Brownian motion within a two-dimensional circular domain. The particle is confined within a circle of radius <code>r</code> and can only exit through a small opening defined by an angular width <code>θ</code>. We study how the mean exit time depends on various parameters, particularly the opening angle.</p>
<h3 id="table-of-contents">Table of Contents</h3>
<ul>
<li><a href="#escape-of-a-particle-from-an-intracellular-region">Escape of a Particle from an Intracellular Region</a><ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#table-of-contents">Table of Contents</a></li>
<li><a href="#theoretical-background">Theoretical Background</a><ul>
<li><a href="#brownian-motion">Brownian Motion</a></li>
<li><a href="#problem-setup">Problem Setup</a></li>
</ul>
</li>
<li><a href="#key-findings">Key Findings</a><ul>
<li><a href="#1-mean-exit-time-scaling">1. Mean Exit Time Scaling</a></li>
<li><a href="#2-exit-time-distribution">2. Exit Time Distribution</a></li>
<li><a href="#3-spatial-exit-patterns">3. Spatial Exit Patterns</a></li>
<li><a href="#4-reflection-analysis">4. Reflection Analysis</a></li>
</ul>
</li>
<li><a href="#implementation">Implementation</a><ul>
<li><a href="#core-functions">Core Functions</a></li>
<li><a href="#simulation-parameters">Simulation Parameters</a></li>
</ul>
</li>
<li><a href="#usage">Usage</a><ul>
<li><a href="#basic-simulation">Basic Simulation</a></li>
<li><a href="#parameter-studies">Parameter Studies</a></li>
</ul>
</li>
<li><a href="#results-visualization">Results Visualization</a></li>
<li><a href="#dependencies">Dependencies</a></li>
<li><a href="#applications">Applications</a></li>
<li><a href="#theoretical-validation">Theoretical Validation</a></li>
<li><a href="#future-extensions">Future Extensions</a></li>
</ul>
</li>
</ul>
<h3 id="theoretical-background">Theoretical Background</h3>
<h4 id="brownian-motion">Brownian Motion</h4>
<p>The particle movement follows Brownian motion, a continuous-time stochastic process <code>X = (X_t)_{t ∈ [0, ∞)}</code> with variance <code>σ²</code>, satisfying:</p>
<ul>
<li><code>P(X_0 = 0) = 1</code> (starts at origin)</li>
<li>Almost sure continuity</li>
<li>Stationary and independent increments</li>
<li><code>X_t ~ N(0, σ²t)</code> for every <code>t ∈ [0, ∞)</code></li>
</ul>
<h4 id="problem-setup">Problem Setup</h4>
<ul>
<li><strong>Domain</strong>: Circular region of radius <code>r</code></li>
<li><strong>Escape condition</strong>: Exit through opening of angular width <code>θ</code></li>
<li><strong>Boundary behavior</strong>: Elastic reflection at walls (except at the opening)</li>
<li><strong>Initial condition</strong>: Particle starts at the center or specified position</li>
</ul>
<h3 id="key-findings">Key Findings</h3>
<h4 id="1-mean-exit-time-scaling">1. Mean Exit Time Scaling</h4>
<p>The mean exit time <code>τ</code> follows the relationship:</p>
<pre><code>τ ∝ r²/θ
</code></pre><ul>
<li><strong>Inversely proportional</strong> to opening angle <code>θ</code></li>
<li><strong>Quadratically proportional</strong> to domain radius <code>r</code></li>
<li><strong>Inversely proportional</strong> to diffusion coefficient <code>D</code></li>
</ul>
<h4 id="2-exit-time-distribution">2. Exit Time Distribution</h4>
<ul>
<li><strong>Right-skewed distribution</strong> with exponential decay</li>
<li>Most particles escape quickly, with a long tail for delayed escapes</li>
<li>Distribution shape independent of opening size, but scale varies</li>
</ul>
<h4 id="3-spatial-exit-patterns">3. Spatial Exit Patterns</h4>
<ul>
<li>Small openings: concentrated exit points near opening edges</li>
<li>Large openings: more uniform distribution across the opening</li>
<li>Edge effects become prominent for wider openings</li>
</ul>
<h4 id="4-reflection-analysis">4. Reflection Analysis</h4>
<ul>
<li><strong>Inverse relationship</strong> between opening size and reflection count</li>
<li>Narrow openings require extensive boundary exploration</li>
<li>Wide openings minimize particle-wall interactions</li>
</ul>
<h3 id="implementation">Implementation</h3>
<h4 id="core-functions">Core Functions</h4>
<ol>
<li><strong><code>plot_circle(r, theta)</code></strong>: Visualizes the circular domain with opening</li>
<li><strong><code>intersection(x, y, x_prev, y_prev, r)</code></strong>: Calculates line-circle intersections</li>
<li><strong><code>check_exit(x, y, x_prev, y_prev, theta, r)</code></strong>: Determines if particle escaped</li>
<li><strong><code>movement(x, y, x_prev, y_prev, theta, r)</code></strong>: Handles boundary reflections</li>
<li><strong><code>Brownian_stepmove(...)</code></strong>: Simulates single Brownian motion step</li>
<li><strong><code>simulate_particle(...)</code></strong>: Runs complete escape simulation</li>
</ol>
<h4 id="simulation-parameters">Simulation Parameters</h4>
<ul>
<li><strong>Time step</strong>: <code>dt = 0.01</code></li>
<li><strong>Diffusion coefficient</strong>: <code>D = 1.0</code> (adjustable)</li>
<li><strong>Domain radius</strong>: <code>r = 1.0</code> (adjustable)</li>
<li><strong>Opening angles</strong>: Range from <code>π/16</code> to <code>2π</code></li>
<li><strong>Simulation limit</strong>: <code>T_lim = 1000</code> time units</li>
</ul>
<h3 id="usage">Usage</h3>
<h4 id="basic-simulation">Basic Simulation</h4>
<pre><code class="lang-python"><span class="hljs-comment"># Simulate single particle escape</span>
<span class="hljs-attr">exit_time</span> = simulate_particle(
    <span class="hljs-attr">x0=0.0,</span> <span class="hljs-attr">y0=0.0,</span>      <span class="hljs-comment"># Initial position</span>
    <span class="hljs-attr">D=1.0,</span>               <span class="hljs-comment"># Diffusion coefficient</span>
    <span class="hljs-attr">dt=0.01,</span>             <span class="hljs-comment"># Time step</span>
    <span class="hljs-attr">theta=np.pi/4,</span>       <span class="hljs-comment"># Opening angle</span>
    <span class="hljs-attr">r=1,</span>                 <span class="hljs-comment"># Circle radius</span>
    <span class="hljs-attr">T_lim=1000,</span>          <span class="hljs-comment"># Time limit</span>
    <span class="hljs-attr">make_plot=True</span>       <span class="hljs-comment"># Visualization</span>
)
</code></pre>
<h4 id="parameter-studies">Parameter Studies</h4>
<pre><code class="lang-python"># Study <span class="hljs-built_in">mean</span> exit <span class="hljs-built_in">time</span> vs opening angle
theta_values = <span class="hljs-built_in">np</span>.linspace(<span class="hljs-built_in">np</span>.pi/<span class="hljs-number">16</span>, <span class="hljs-built_in">np</span>.pi*<span class="hljs-number">2</span>, <span class="hljs-number">30</span>)
<span class="hljs-keyword">for</span> theta <span class="hljs-keyword">in</span> theta_values:
    exit_times = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
        exit_time = simulate_particle(theta=theta, ...)
        exit_times.<span class="hljs-built_in">append</span>(exit_time)
    mean_exit_time = <span class="hljs-built_in">np</span>.<span class="hljs-built_in">mean</span>(exit_times)
</code></pre>
<h3 id="results-visualization">Results Visualization</h3>
<p>The project includes comprehensive visualizations:</p>
<ol>
<li><strong>Trajectory plots</strong>: Individual particle paths with reflections</li>
<li><strong>Exit time histograms</strong>: Distribution analysis for different parameters</li>
<li><strong>Scaling relationships</strong>: Mean exit time vs. opening angle, radius, diffusion coefficient</li>
<li><strong>Spatial distributions</strong>: Polar histograms of exit locations</li>
<li><strong>Survival curves</strong>: Temporal escape probability analysis</li>
<li><strong>Time-lapse snapshots</strong>: Multi-particle evolution over time</li>
</ol>
<h3 id="dependencies">Dependencies</h3>
<pre><code class="lang-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-title">from</span> scipy.stats <span class="hljs-keyword">import</span> linregress
<span class="hljs-title">from</span> scipy.optimize <span class="hljs-keyword">import</span> curve_fit
<span class="hljs-keyword">import</span> fractions
</code></pre>
</code></pre><h3 id="applications">Applications</h3>
<p>This research has applications in:</p>
<ul>
<li><strong>Cell biology</strong>: Understanding molecular transport in cellular compartments</li>
<li><strong>Materials science</strong>: Diffusion in porous media with selective barriers</li>
<li><strong>Physics</strong>: First-passage time problems in confined geometries</li>
<li><strong>Engineering</strong>: Design of filtration and separation systems</li>
</ul>
<h3 id="theoretical-validation">Theoretical Validation</h3>
<p>Our simulations confirm several theoretical predictions:</p>
<ul>
<li>Power-law scaling relationships</li>
<li>Exponential survival probability decay</li>
<li>Markovian escape process characteristics</li>
<li>Geometric effects on boundary interactions</li>
</ul>
<h3 id="future-extensions">Future Extensions</h3>
<p>Potential improvements and extensions:</p>
<ul>
<li>Non-circular geometries</li>
<li>Multiple openings</li>
<li>Position-dependent diffusion coefficients</li>
<li>External force fields</li>
<li>Three-dimensional domains</li>
</ul>
    `,
    technologies: ['Python', 'NumPy', 'pandas'],
    githubUrl: 'https://github.com/sstraccialini/Escape-of-a-Particle-Brownian-Motion',
    imageUrl: '/assets/images/projects/flutter-fitness-tracker.jpg',
    featured: false,
    category: 'Data Science',
    date: '2025-07',
    status: 'completed'
  },
  {
    id: 'futoshiki-puzzle-solver',
    title: 'Futoshiki Puzzle Solver using Evolutionary Programming',
    description: 'Futoshiki puzzle solver using genetic algorithms and island models to tackle complex constraint satisfaction problems through evolutionary programming.',
    longDescription: `
<p>This project implements an <strong>Evolutionary Programming</strong> approach to solve <strong>Futoshiki puzzles</strong>, a Japanese logic-based combinatorial number puzzle. The solver uses genetic algorithms and advanced techniques like island models to tackle the complex constraint satisfaction problem that Futoshiki presents.</p>
<p>This project was developed for the course <code>30592 -Topics in Computational Modelling - From Information Theory to Evolutionary Models</code>, Bocconi University.</p>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#futoshiki-puzzle-solver-using-evolutionary-programming">Futoshiki Puzzle Solver using Evolutionary Programming</a><ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#table-of-contents">Table of Contents</a></li>
<li><a href="#about-futoshiki">About Futoshiki</a><ul>
<li><a href="#rules">Rules:</a></li>
</ul>
</li>
<li><a href="#project-features">Project Features</a><ul>
<li><a href="#core-implementation">Core Implementation</a></li>
<li><a href="#evolutionary-algorithms">Evolutionary Algorithms</a></li>
<li><a href="#optimization-features">Optimization Features</a></li>
</ul>
</li>
<li><a href="#files-structure">Files Structure</a></li>
<li><a href="#key-components">Key Components</a><ul>
<li><a href="#1-puzzle-representation">1. Puzzle Representation</a></li>
<li><a href="#2-solution-candidates">2. Solution Candidates</a></li>
<li><a href="#3-genetic-algorithm">3. Genetic Algorithm</a></li>
<li><a href="#4-island-model">4. Island Model</a></li>
</ul>
</li>
<li><a href="#performance-results">Performance Results</a><ul>
<li><a href="#44-puzzles">4×4 Puzzles</a></li>
<li><a href="#55-and-66-puzzles">5×5 and 6×6 Puzzles</a></li>
<li><a href="#key-findings">Key Findings</a></li>
</ul>
</li>
<li><a href="#usage">Usage</a><ul>
<li><a href="#example-usage">Example Usage</a></li>
</ul>
</li>
<li><a href="#dependencies">Dependencies</a></li>
<li><a href="#future-work">Future Work</a></li>
</ul>
</li>
</ul>
<h2 id="about-futoshiki">About Futoshiki</h2>
<p><strong>Futoshiki</strong> (不等式, meaning &quot;inequality&quot; in Japanese), also known as &quot;Unequal&quot;, is a logic puzzle similar to Sudoku but with inequality constraints between adjacent cells.</p>
<h3 id="rules-">Rules:</h3>
<ol>
<li>The puzzle is played on an N × N square grid (commonly 4×4, 5×5, or 6×6)</li>
<li>Some cells contain predefined numbers that cannot be changed</li>
<li>Fill each cell with a number from 1 to N</li>
<li>Each number must appear exactly once in every row</li>
<li>Each number must appear exactly once in every column</li>
<li>Some cells are separated by inequality signs (&lt; or &gt;) that indicate relative ordering between adjacent cells</li>
<li>Any placed numbers must satisfy all given inequality constraints</li>
<li>The puzzle has a unique solution that respects all constraints</li>
</ol>
<h2 id="project-features">Project Features</h2>
<h3 id="core-implementation">Core Implementation</h3>
<ul>
<li><strong>FutoshikiPuzzle Class</strong>: Represents and handles puzzle instances with constraints</li>
<li><strong>Individual Class</strong>: Represents candidate solutions in the genetic algorithm</li>
<li><strong>Fitness Evaluation</strong>: Counts constraint violations (row, column, and inequality)</li>
<li><strong>Genetic Operators</strong>: Crossover and mutation for solution evolution</li>
</ul>
<h3 id="evolutionary-algorithms">Evolutionary Algorithms</h3>
<ol>
<li><p><strong>Standard Genetic Algorithm</strong></p>
<ul>
<li>Population-based evolutionary approach</li>
<li>Elitism strategy (preserves top 10% of individuals)</li>
<li>Roulette wheel selection for parent selection</li>
<li>Crossover and mutation operators</li>
</ul>
</li>
<li><p><strong>Island Model Genetic Algorithm</strong></p>
<ul>
<li>Multiple isolated populations (islands)</li>
<li>Independent evolution with periodic migration</li>
<li>Ring topology for migration between islands</li>
<li>Enhanced diversity and escape from local optima</li>
</ul>
</li>
</ol>
<h3 id="optimization-features">Optimization Features</h3>
<ul>
<li><strong>Grid Search</strong>: Systematic hyperparameter optimization</li>
<li><strong>Performance Analysis</strong>: Fitness tracking and visualization</li>
<li><strong>Multiple Puzzle Sizes</strong>: Support for 4×4, 5×5, and 6×6 grids</li>
</ul>
<h2 id="files-structure">Files Structure</h2>
<pre><code>├── project.ipynb           # Main Jupyter notebook <span class="hljs-keyword">with</span> complete <span class="hljs-keyword">implementation</span>
├── project_Straccialini.html  # HTML <span class="hljs-keyword">export</span> <span class="hljs-keyword">of</span> the notebook
└── README.md              # This file
</code></pre><h2 id="key-components">Key Components</h2>
<h3 id="1-puzzle-representation">1. Puzzle Representation</h3>
<pre><code class="lang-python"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FutoshikiPuzzle</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, size, initial_grid, constraints)</span></span>:
        <span class="hljs-comment"># Initialize puzzle with size, grid, and inequality constraints</span>
</code></pre>
<h3 id="2-solution-candidates">2. Solution Candidates</h3>
<pre><code class="lang-python"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Individual</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(<span class="hljs-keyword">self</span>, puzzle)</span></span>:
        <span class="hljs-comment"># Represents a candidate solution with fitness evaluation</span>
        <span class="hljs-comment"># Implements crossover and mutation operators</span>
</code></pre>
<h3 id="3-genetic-algorithm">3. Genetic Algorithm</h3>
<pre><code class="lang-python">def genetic_algorithm(puzzle, <span class="hljs-attr">population_size=100,</span> <span class="hljs-attr">generations=1000,</span> 
                     <span class="hljs-attr">mutation_rate=0.1,</span> <span class="hljs-attr">verbose=False):</span>
    <span class="hljs-comment"># Standard GA implementation with elitism and roulette wheel selection</span>
</code></pre>
<h3 id="4-island-model">4. Island Model</h3>
<pre><code class="lang-python">def island_model_genetic_algorithm(puzzle, <span class="hljs-attr">islands=5,</span> <span class="hljs-attr">pop_per_island=50,</span> 
                                  <span class="hljs-attr">generations=200,</span> <span class="hljs-attr">migration_interval=20,</span> 
                                  <span class="hljs-attr">mutation_rate=0.1,</span> <span class="hljs-attr">verbose=False):</span>
    <span class="hljs-comment"># Advanced GA with multiple populations and migration</span>
</code></pre>
<h2 id="performance-results">Performance Results</h2>
<h3 id="4-4-puzzles">4×4 Puzzles</h3>
<ul>
<li>Standard GA: Excellent performance with proper hyperparameter tuning</li>
<li>Optimal parameters found through grid search</li>
<li>Consistent solution finding within reasonable generations</li>
</ul>
<h3 id="5-5-and-6-6-puzzles">5×5 and 6×6 Puzzles</h3>
<ul>
<li>Standard GA: Struggles with local optima, limited success</li>
<li>Island Model: Significantly improved performance</li>
<li>Successfully solves complex puzzles where standard GA fails</li>
</ul>
<h3 id="key-findings">Key Findings</h3>
<ol>
<li><strong>Population size matters</strong>: Larger populations maintain better genetic diversity</li>
<li><strong>Mutation rate balance</strong>: 0.1-0.2 provides optimal exploration vs. exploitation</li>
<li><strong>Island model superiority</strong>: Outperforms standard GA on larger, more complex puzzles</li>
<li><strong>Genetic diversity</strong>: Critical for escaping local optima in constraint satisfaction problems</li>
</ol>
<h2 id="usage">Usage</h2>
<ol>
<li><strong>Open the Jupyter notebook</strong>: <code>project.ipynb</code></li>
<li><strong>Run the cells sequentially</strong> to see the implementation and results</li>
<li><strong>Modify puzzle instances</strong> or parameters to experiment with different configurations</li>
<li><strong>Use the provided test puzzles</strong> or create your own following the format</li>
</ol>
<h3 id="example-usage">Example Usage</h3>
<pre><code class="lang-python"># Define a <span class="hljs-number">4</span>x4 puzzle
test_puzzle = FutoshikiPuzzle(
    size=<span class="hljs-number">4</span>,
    initial_grid=[[<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>]],
    constraints=[((<span class="hljs-number">0</span>,<span class="hljs-number">0</span>), (<span class="hljs-number">1</span>,<span class="hljs-number">0</span>)), ((<span class="hljs-number">1</span>,<span class="hljs-number">1</span>), (<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)), ...]
)

# Solve with standard GA
solution, generation, fitness_history = genetic_algorithm(
    test_puzzle, 
    population_size=<span class="hljs-number">1000</span>, 
    generations=<span class="hljs-number">1000</span>, 
    mutation_rate=<span class="hljs-number">0.1</span>
)

# Solve with island model
solution, generation, fitness_history = island_model_genetic_algorithm(
    test_puzzle,
    islands=<span class="hljs-number">5</span>,
    pop_per_island=<span class="hljs-number">200</span>,
    generations=<span class="hljs-number">500</span>
)
</code></pre>
<h2 id="dependencies">Dependencies</h2>
<ul>
<li>Python 3.x</li>
<li>matplotlib (for visualization)</li>
<li>random (for stochastic operations)</li>
<li>copy (for deep copying)</li>
</ul>
<h2 id="future-work">Future Work</h2>
<p>Potential enhancements include:</p>
<ul>
<li><strong>Constraint-aware mutation</strong>: Operators that directly address violated constraints</li>
<li><strong>Advanced crossover strategies</strong>: Preserving valid row/column permutations</li>
<li><strong>Island model optimization</strong>: Fine-tuning topology, migration strategies, and parameters</li>
<li><strong>Hybrid approaches</strong>: Combining with local search or constraint propagation</li>
<li><strong>Parallel implementation</strong>: Leveraging multi-core processing for island populations</li>
</ul>
    `,
    technologies: ['Python', 'Evolutionary Algorithms', 'Genetic Algorithms'],
    githubUrl: 'https://github.com/sstraccialini/Futoshiki-Solver-using-Evolutionary-Programming',
    imageUrl: '/assets/images/projects/nlp-chatbot-framework.jpg',
    featured: false,
    category: 'Other',
    date: '2025-07',
    status: 'completed'
  },
  {
    id: 'brainfuck-interpreter',
    title: 'JavaScript BrainFuck interpreter',
    description: 'Optimized JavaScript Brainfuck interpreter with loop unrolling, precalculated jumps, and operator compression for faster execution.',
    longDescription: `
<h1 id="javascript-brainfuck-interpreter">JavaScript BrainFuck interpreter</h1>
<p>A simple <a href="https://esolangs.org/wiki/Brainfuck">brainfuck</a> interpreter with some optimizations written in JavaScript.</p>
<h2 id="language-basics">Language basics</h2>
<ol>
<li>The runtime has an infinite tape, representing the memory of the program.</li>
<li>The runtime maintains a program counter (<code>pc</code>) which tracks the position of the executing command in the program.</li>
<li>The runtime maintains a data pointer (cell counter <code>cc</code>), which points to a specific location on the tape.</li>
<li>There are 8 commands, made of only one character.</li>
</ol>
<p>Here are the commands (the pointer is <code>cc</code>):</p>
<pre><code class="lang-bf">+ : increment value <span class="hljs-keyword">in</span> memory <span class="hljs-keyword">at</span> <span class="hljs-keyword">the</span> pointer <span class="hljs-keyword">by</span> <span class="hljs-number">1</span>

- : decrement value <span class="hljs-keyword">in</span> memory <span class="hljs-keyword">at</span> <span class="hljs-keyword">the</span> pointer <span class="hljs-keyword">by</span> <span class="hljs-number">1</span>

&gt; : move <span class="hljs-keyword">the</span> pointer <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> right <span class="hljs-keyword">by</span> <span class="hljs-number">1</span>

&lt; : move <span class="hljs-keyword">the</span> pointer <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> left <span class="hljs-keyword">by</span> <span class="hljs-number">1</span>

. : output (print) <span class="hljs-keyword">the</span> byte <span class="hljs-keyword">at</span> <span class="hljs-keyword">the</span> pointer

, : <span class="hljs-built_in">read</span> byte input <span class="hljs-keyword">and</span> store <span class="hljs-keyword">it</span> <span class="hljs-keyword">into</span> <span class="hljs-keyword">the</span> cell <span class="hljs-keyword">at</span> <span class="hljs-keyword">the</span> pointer

[ : If <span class="hljs-keyword">the</span> byte <span class="hljs-keyword">at</span> <span class="hljs-keyword">the</span> pointer <span class="hljs-keyword">is</span> zero, jump <span class="hljs-keyword">it</span> forward <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> command <span class="hljs-keyword">after</span> <span class="hljs-keyword">the</span> matching ] command.

] : If <span class="hljs-keyword">the</span> byte <span class="hljs-keyword">at</span> pointer <span class="hljs-keyword">is</span> nonzero, jump <span class="hljs-keyword">it</span> <span class="hljs-keyword">back</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">the</span> command <span class="hljs-keyword">after</span> <span class="hljs-keyword">the</span> matching [ command.
</code></pre>
<h2 id="optimizations">Optimizations</h2>
<ol>
<li>Operators <code>Ops</code> are introduced to translate the program into a different representation.</li>
<li>Each bracket <code>[</code> and <code>]</code> is associated with the position the pointer will jump to. Precalculating jumps turn the dynamic searches into a simple lookup.</li>
<li>Repeated sequences of instructions are replaced with a single operator which stores the number of times it needs to be executed.</li>
<li>Sequences of the type <code>[-]</code>, which subtract one to the cell the pointer is pointing to, until its value is 0, are directly replaced with a <code>Zero</code> operator, which directly assigns the valu of 0 to the current cell.</li>
<li>Loop unrolling: patterns of the type <code>[-&gt;++&lt;]</code>, meaning: &quot;move the pointer to the next cell, add 2, then move it back and subtract 1 to the current cell until its value is 0&quot;, can be simply replaced by simple mathematical operations of the type <code>cc[i+1] += NumberOfAddOperations * cc[i]</code></li>
</ol>
<h2 id="tests">Tests</h2>
<p>Experimental results on some standard brainfuck programs (available in test folder) show excellent results after applying all optimizations with respect to an unoptimized interpreter with up to 9 times faster execution. Below is the execution in milliseconds of some sample programs from the unoptimized -&gt; optimized interpreter (note that &#39;hanoi&#39; and &#39;mandel&#39; base time is already calculated on some partially optimized version of the interpreter, since a base interpreter encounters memory errors and is not able to run it)</p>
<pre><code><span class="hljs-string">'hello'</span>: <span class="hljs-number">206</span> -&gt; <span class="hljs-number">189</span>
<span class="hljs-string">'bench'</span>: <span class="hljs-number">38118</span> -&gt; <span class="hljs-number">7299</span>
<span class="hljs-string">'hanoi'</span>: <span class="hljs-number">46715</span> -&gt; <span class="hljs-number">5199</span>
<span class="hljs-string">'mandelbrot'</span>: <span class="hljs-number">91413</span> -&gt; <span class="hljs-number">44933</span>
</code></pre><hr>
<p>Other ideas of optimizations can be found on <a href="http://calmerthanyouare.org/2015/01/07/optimizing-brainfuck.html">this website</a> togheter with some other test results.</p>
    `,
    technologies: ['JavaScript', 'Algorithms', 'Interpreter', 'Brainfuck'],
    githubUrl: 'https://github.com/sstraccialini/brainfuck-interpreter-js',
    // demoUrl: 'https://iot-dashboard-demo.vercel.app',
    imageUrl: '/assets/images/projects/iot-dashboard.jpg',
    featured: false,
    category: 'Other',
    date: '2024-12',
    status: 'completed'
  },
  {
    id: 'automatic-quiz-scoring',
    title: 'Automatic Quiz Scoring',
    description: 'Statistical analysis and automated answer recognition for the “Campionati della Cultura e del Talento” quiz using Machine Learning. Developed by Hephaestus Applied AI Association using PCA and SVM-based classifiers.',
    longDescription: `
<h3>Presentation</h3>
This project was created by Bocconi's Hephaestus Applied Artificial Intelligence Association during Spring 2024 period. In this repository you can find the final paper with a detailed explanation of motivations, execution and results of our research. If you wish to investigate the code we used to conduct our analysis you can find all the scripts in the present repository. For some help in navigating the repository, please have a look at the last section.
<br/>
<h3>Description</h3>
The objective of this project is to provide a comprehensive statistical analysis of responses collecteds from the "Campionati della Cultura e del Talento", an annual competition designed for Italian high school students. This contest involves a series of 50 multiple-choice questions, covering a range of topics that vary each year. Following the administration of the quiz, teachers grade the paper answer sheets and forward the scores along with scanned copies of the completed quizzes to the hosting association. Traditionally, the association selects a random subset of these quizzes for detailed analysis to extract data and insights.
<br/><br/>
Conversely, this project aims to enhance the scope of analysis by including all submitted scores. To achieve this, a program equipped with advanced letter recognition capabilities was developed, facilitating the precise classification and organisation of data into a well-structured table. This method allows for a more thorough and accurate evaluation of the competition’s outcomes.
<br/>
<h3>Dataset</h3>
The original dataset is composed of photos or scanned documents of the tests. In order to use we needed to normalize images and extract letters from them in order to train a classifier. Details can be found in the main.ipynb file.
<br/>
<h3>Classification</h3>
To reduce dimensionality of our datapoints we applied Principal Component Analysis (PCA), to convert a 11140 × 37440 dimensional array into a 11140 × 400 one, with the least possible data loss. To classify our data we then tried Support Vector Machine and Stochastic Gradient Descent classifiers. Hyperparameters of both algorithms were tuned using cross-validated GridSearch. Finally, SVM model revealed to be the best-performing one.
<br/>
Theoretical details on these procedures can be found in the report file
    `,
    technologies: ['Python', 'OpenCV', 'NumPy', 'scikit-learn'],
    githubUrl: 'https://github.com/Hephaestus-AI-Association/Automatic-Quiz-Scoring',
    paperUrl: 'https://github.com/Hephaestus-AI-Association/Automatic-Quiz-Scoring/blob/main/report.pdf',
    imageUrl: '/assets/images/projects/cv-anomaly-detection.jpg',
    featured: true,
    category: 'AI/ML',
    date: '2024-09',
    status: 'completed'
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  // Perform case-insensitive matching so URLs are tolerant to slug casing
  const normalized = id.toLowerCase();
  return projects.find(project => project.id.toLowerCase() === normalized);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter(project => project.category === category);
}