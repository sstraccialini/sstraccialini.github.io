import Navigation from '@/components/navigation';
import ProjectsSection from '@/components/projects-section';

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of my work in AI, machine learning, and software development.
            </p>
          </div>
          <ProjectsSection />
        </div>
      </main>
    </div>
  );
}