import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import MiniBio from '@/components/mini-bio';
import ProjectsSection from '@/components/projects-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MiniBio />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}