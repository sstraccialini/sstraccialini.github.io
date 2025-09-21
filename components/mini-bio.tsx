import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function MiniBio() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a passionate Artificial Intelligence student with a strong foundation in machine learning, 
              web development, and software engineering. Currently pursuing my degree while actively building 
              projects that bridge the gap between academic knowledge and real-world applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              My focus areas include natural language processing, computer vision, and full-stack development. 
              I'm particularly interested in how AI can be integrated into practical solutions that solve 
              meaningful problems. I'm actively seeking internship opportunities where I can contribute to 
              innovative projects while continuing to learn and grow.
            </p>
            <div className="text-center">
              <Button asChild className="gap-2">
                <Link href="/about">
                  Learn More About My Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}