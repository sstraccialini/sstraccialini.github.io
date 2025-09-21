'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Github, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, type Project } from '@/lib/projects';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const pathname = usePathname() || '';

  const categories = ['all', 'AI/ML', 'Data Science', 'Web Development', 'Mobile', 'Other'];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {pathname !== '/projects' && (
          <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my work in artificial intelligence, machine learning, and software development. 
          Each project demonstrates practical applications of cutting-edge technologies.
        </p>
          </div>
        )}

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="text-xs sm:text-sm py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category === 'all' ? 'All' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  
                  {project.paperUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        Report
                      </a>
                    </Button>
                  )}
                  
                  {project.demoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  
                  <Button size="sm" asChild>
                    <Link href={`/projects/${project.id.toLowerCase()}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pathname !== '/projects' && (
          <div className="text-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}