'use client';

import { Github, Mail, Download, ExternalLink, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarImagePath, getCVPath } from '@/lib/assets';

export default function HeroSection() {
  const handleDownloadCV = () => {
    // Open CV PDF in new tab
    window.open(getCVPath(), '_blank');
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <Avatar className="w-32 h-32 mx-auto mb-8">
            <AvatarImage src={getAvatarImagePath()} alt="Samuele Nicolò Straccialini" />
            <AvatarFallback className="text-2xl">SNS</AvatarFallback>
          </Avatar>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Samuele Nicolò Straccialini
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            AI student building real-world solutions
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="gap-2" asChild>
              <a href="https://github.com/sstraccialini" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/samuele-nicolo-straccialini/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="gap-2" onClick={handleDownloadCV}>
              <Download className="w-5 h-5" />
              Download CV
            </Button>
            
            <Button size="lg" variant="outline" className="gap-2" onClick={handleScrollToContact}>
              <Mail className="w-5 h-5" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}