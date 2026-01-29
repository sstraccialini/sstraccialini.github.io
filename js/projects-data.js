/**
 * Projects Data - Single source of truth for all projects
 * Add 'featured: true' to display a project on the homepage
 * 
 * Link formats (all support string or object):
 *   code: 'url'                        // GitHub icon, label "Code"
 *   code: { url: 'url', label: 'Source' }
 *   
 *   report: 'url'                      // Document icon, label "Report"  
 *   report: { url: 'url', label: 'Thesis' }
 *   
 *   link: 'url'                        // Link icon, label "Link"
 *   link: { url: 'url', label: 'Demo' }
 *   
 *   page: 'projects/my-project.html'   // Arrow icon, label "Read More"
 * 
 * Project page metadata:
 *   date: 'Month Year'                 // Completion date
 *   categoryDisplay: 'AI/ML, NLP'      // Display version of category
 *   organization: 'Organization Name'  // Optional organization
 *   technologies: ['Tech1', 'Tech2']   // Detailed tech list for sidebar
 */

const PROJECTS_DATA = [
  {
    id: 'k-means-heuristics',
    title: 'K-Means Clustering Heuristics',
    description: "Bachelor's thesis exploring novel heuristics for efficient and accurate k-means clustering, including a proposed extended-Hartigan algorithm and its empirical evaluation.",
    tags: ['Python', 'scikit-learn', 'optimization', 'ML'],
    category: 'ai-ml data-science',
    status: 'Completed',
    featured: true,
    date: 'July 2023',
    categoryDisplay: 'AI/ML, Data Science',
    technologies: ['Python', 'scikit-learn', 'NumPy', 'Matplotlib', 'K-Means', 'Clustering'],
    links: {
      code: 'https://github.com/sstraccialini/k-means',
      report: {
        url: 'https://github.com/sstraccialini/k-means/blob/main/Tesi-final.pdf',
        label: 'Thesis'
      },
      page: 'projects/k-means-heuristics.html'
    }
  },
  {
    id: 'repo-summarizer',
    title: 'RepoSummarizer',
    description: "A local, AI-powered tool that analyzes any public GitHub repository and turns it into clear, structured documentation, including concise summaries and visual overviews.",
    tags: ['Python', 'LLM', 'Ollama', 'CLI'],
    category: 'ai-ml software',
    status: 'Completed',
    featured: true,
    date: 'January 2026',
    categoryDisplay: 'AI/ML, Software',
    technologies: ['Python', 'llama-cpp-python', 'GitPython', 'Mermaid', 'SQLite', 'GGUF'],
    links: {
      code: 'https://github.com/sstraccialini/repo-summarizer',
      link: {
        url: 'https://sstraccialini.github.io/repo-summarizer/',
        label: 'Examples'
      },
      page: 'projects/repo-summarizer.html'
    }
  },
  {
    id: 'subert',
    title: 'SuBERT',
    description: 'End-to-end pipeline for recognizing and translating ancient Sumerian cuneiform using computer vision and Transformer-based models (BART, GPT, YOLO, Faster R-CNN).',
    tags: ['Python', 'PyTorch', 'HuggingFace', 'BART', 'YOLO'],
    category: 'ai-ml',
    status: 'Completed',
    featured: true,
    date: 'January 2024',
    categoryDisplay: 'AI/ML, Computer Vision, NLP',
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'BART', 'GPT', 'YOLO', 'Faster R-CNN'],
    links: {
      code: 'https://github.com/sstraccialini/AI-project-SuBERT',
      report: {
        url: 'https://github.com/sstraccialini/AI-project-SuBERT/blob/main/SuBERT-project_report.pdf',
        label: 'Report'
      },
      page: 'projects/subert.html'
    }
  },
  {
    id: 'automatic-quiz-scoring',
    title: 'Automatic Quiz Scoring',
    description: 'Statistical analysis and automated answer recognition system using Machine Learning (PCA and SVM-based classifiers). Developed with Hephaestus Applied AI Association.',
    tags: ['Python', 'OpenCV', 'NumPy', 'scikit-learn'],
    category: 'ai-ml',
    status: 'Completed',
    featured: false,
    date: 'December 2022',
    categoryDisplay: 'AI/ML, Computer Vision',
    organization: 'Hephaestus AI Association',
    technologies: ['Python', 'OpenCV', 'NumPy', 'scikit-learn', 'PCA', 'SVM', 'Matplotlib'],
    links: {
      code: 'https://github.com/Hephaestus-AI-Association/Automatic-Quiz-Scoring',
      report: {
        url: 'https://github.com/Hephaestus-AI-Association/Automatic-Quiz-Scoring/blob/main/report.pdf',
        label: 'Report'
      },
      page: 'projects/automatic-quiz-scoring.html'
    }
  },
  {
    id: 'escape-particle-bm',
    title: 'Particle Escape (Brownian Motion)',
    description: 'Simulation study exploring the escape of a particle from an intracellular region using Brownian motion dynamics and statistical analysis.',
    tags: ['Python', 'NumPy', 'pandas', 'Simulation'],
    category: 'data-science',
    status: 'Completed',
    featured: false,
    date: 'May 2022',
    categoryDisplay: 'Data Science, Simulation',
    technologies: ['Python', 'NumPy', 'pandas', 'Matplotlib', 'Simulation'],
    links: {
      code: 'https://github.com/sstraccialini/Escape-of-a-Particle-Brownian-Motion',
      page: 'projects/escape-particle-bm.html'
    }
  },
  {
    id: 'futoshiki-puzzle-solver',
    title: 'Futoshiki Puzzle Solver',
    description: 'Puzzle solver using genetic algorithms and island models to tackle complex constraint satisfaction problems through evolutionary programming.',
    tags: ['Python', 'Evolutionary Algorithms', 'Genetic Algorithms'],
    category: 'ai-ml software',
    status: 'Completed',
    featured: false,
    date: 'June 2023',
    categoryDisplay: 'AI/ML, Optimization',
    technologies: ['Python', 'Evolutionary Algorithms', 'Genetic Algorithms', 'Island Model'],
    links: {
      code: 'https://github.com/sstraccialini/Futoshiki-Solver-using-Evolutionary-Programming',
      page: 'projects/futoshiki-puzzle-solver.html'
    }
  },
  {
    id: 'brainfuck-interpreter',
    title: 'BrainFuck Interpreter',
    description: 'Optimized JavaScript Brainfuck interpreter with loop unrolling, precalculated jumps, and operator compression for faster execution.',
    tags: ['JavaScript', 'Algorithms', 'Interpreter'],
    category: 'software other',
    status: 'Completed',
    featured: false,
    date: 'March 2022',
    categoryDisplay: 'Software, Algorithms',
    technologies: ['JavaScript', 'Algorithms', 'Interpreter', 'Optimization'],
    links: {
      code: 'https://github.com/sstraccialini/brainfuck-interpreter-js',
      page: 'projects/brainfuck-interpreter.html'
    }
  }
];

// Make available globally
if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
