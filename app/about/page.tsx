'use client';

import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Award, Code, Database, Brain, GraduationCap } from 'lucide-react';
import { getCVPath } from '@/lib/assets';

export default function About() {
  const handleDownloadCV = () => {
    // Open CV PDF in new tab
    window.open(getCVPath(), '_blank');
  };
  const skills = {
    languages: ['Python', 'JavaScript', 'C', 'Dart', 'HTML', 'CSS', 'Haskell', 'C#', 'R', 'MATLAB', 'SQL'],
    frameworks: ['Flutter', 'React', 'Node.js'],
    ml: ['TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'OpenCV'],
    tools: ['Git', 'AWS', 'Supabase'],
    areas: ['Machine Learning', 'Computer Vision', 'NLP', 'Full-Stack Development', 'Web Development', 'Mobile Development']
  };

  const timeline = [
    {
      year: '2025',
      title: 'Started Master\'s Degree',
      description: 'Completed my Bachelor\'s and began my Master\'s in Artificial Intelligence at Bocconi University, Milan.'
    },
    {
      year: '2024',
      title: 'Exchange Semester',
      description: 'Spent a semester at the University of Wisconsin-Madison, US, taking advanced Computer Science courses.'
    },
    {
      year: '2022',
      title: 'Started Bachelor\'s Degree',
      description: 'Began my Bachelor\'s degree in Mathematical and Computing Sciences for Artificial Intelligence at Bocconi University, Milan.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A deeper look into my journey, skills, and passion for artificial intelligence and software development.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Personal Background */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Background & Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

<p className="text-muted-foreground leading-relaxed">
I am a passionate student specializing in Artificial Intelligence, currently in my first year of a Master program at Bocconi University in Milan. My journey into AI began with a fascination for how machines can learn and make decisions, which led me to dive deep into machine learning, neural networks, and their practical applications.
</p>
<p className="text-muted-foreground leading-relaxed">
Before my Master, I completed a Bachelor in Mathematical and Computing Sciences for AI with full marks. During my bachelor's thesis I explored novel heuristics for efficient and accurate k-means clustering, which sharpened both my theoretical grounding and my curiosity for practical impact.
</p>
<p className="text-muted-foreground leading-relaxed">
Throughout my studies, I have kept a strong focus on bridging theoretical knowledge with practical implementation. I believe the best way to understand AI is to build it, which is why I have developed projects that span from computer vision and natural language processing to full-stack applications. At Hephaestus, the Applied AI association at Bocconi, I led projects like Brain2Img, where we reconstructed visual experiences from brain activity using deep learning, Bayesian inference, and diffusion models. I also drove an Automatic Quiz Scoring initiative that stitched together a full pipeline to read and evaluate handwritten answers. Earlier, I worked on predicting ECB interest rates using machine learning, comparing models and selecting what worked best for the task. These experiences taught me how to coordinate teams, define roadmaps, and balance science with usability.
</p>
<p className="text-muted-foreground leading-relaxed">
I broadened my perspective during an exchange at the University of Wisconsin-Madison, where I took courses ranging from Theory of Programming Languages and Cryptography to Dynamical Systems and Quantum Physics. That semester pushed me to think across disciplines and collaborate in new contexts, including contributing to a Unity C# deck-building game with a team of twenty.
</p>
<p className="text-muted-foreground leading-relaxed">
I like projects that blend research flavor with real constraints. Highlights include SuBert, an end-to-end pipeline for recognizing and translating ancient Sumerian cuneiform with computer vision and Transformer models, where I reached strong translation similarity despite scarce data. I have also explored simulation work on Brownian motion and built an evolutionary Futoshiki puzzle solver that tested different genetic strategies. These projects reflect how I learn best: define the problem clearly, build iteratively, measure honestly, and keep notes tidy.
</p>
<p className="text-muted-foreground leading-relaxed">
Community matters to me. I have been a Student Ambassador at Bocconi, supporting prospective students during events and projects. I also volunteered as a math tutor, contributing more than fifty hours to help students with learning difficulties. Along the way I participated in GDG activities and cybersecurity training, hosted a weekly news show on Radio Bocconi, and kept up with sports and music to balance life outside study time.
</p>
<p className="text-muted-foreground leading-relaxed">
Before AI, I learned responsibility in a different setting. Every summer since 2019 I worked at a family gelateria, taking on roles from counter service to the production lab and staff coordination. That experience taught me to handle pressure, communicate clearly, and serve people first. Those lessons still guide how I approach teams and users today.
</p>
<p className="text-muted-foreground leading-relaxed">
My goal is to work on projects that use AI to solve real-world problems and make a positive impact on society. I am particularly interested in the intersection of AI and software development, where intelligent systems can enhance user experiences. Where I am heading is simple to state and challenging to do well: build machine learning systems that are useful, reliable, and understandable. I enjoy problems that sit at the boundary between theory and product, and I seek collaborations where curiosity, kindness, and rigor are expected every day.
</p>

                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">First Year Master Student</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">6+ Projects Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">AI/ML Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Interested in Full-Stack Development</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download CV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a detailed overview of my experience, education, and accomplishments.
                  </p>
                  <Button className="w-full gap-2" onClick={handleDownloadCV}>
                    <Download className="w-4 h-4" />
                    Download CV (PDF)
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spoken Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    A brief summary of languages I speak and my proficiency level.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Italian</span>
                        <Badge variant="secondary">Native</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Mother tongue</div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">English</span>
                        <Badge variant="secondary">C1</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Advanced - CAE Cambridge, 2021</div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">French</span>
                        <Badge variant="secondary">B1</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Intermediate - Classroom study</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Frameworks & Libraries</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">ML & AI</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.ml.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Tools & Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Specialization Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.areas.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Academic & Professional Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}