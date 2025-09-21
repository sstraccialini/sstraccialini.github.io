import { notFound } from 'next/navigation';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FileText, ArrowLeft, Calendar } from 'lucide-react';
import { getProjectById } from '@/lib/projects';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/projects" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="text-center mb-12">
            {/* center the title and description */}
            <h1 className="text-4xl md:text-5xl max-w-6xl mx-auto font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
              
              {project.paperUrl && (
                <Button variant="outline" asChild>
                  <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Read Report
                  </a>
                </Button>
              )}
              
              {project.demoUrl && (
                <Button variant="outline" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Completed in {project.date}</span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Category</h4>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <Badge 
                      className={
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  // This would typically come from your CMS or API
  // normalize slugs to lowercase for predictable routing
  return [
    { slug: 'subert' },
    { slug: 'k-means-heuristics' },
    { slug: 'automatic-quiz-scoring' },
    { slug: 'escape-particle-bm' },
    { slug: 'futoshiki-puzzle-solver' },
    { slug: 'brainfuck-interpreter' },
  ];
}