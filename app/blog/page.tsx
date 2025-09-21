import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export default function Blog() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Where I share thoughts, ideas, and lessons from my journey through AI, machine learning, and software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.featured && (
                      <Badge variant="outline" className="text-xs">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link href={`/blog/${post.id}`} className="flex items-center gap-2 w-full">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">More Content Coming Soon</h2>
                <p className="text-muted-foreground mb-6">
                  I'm working on more articles about AI, machine learning, and software development. 
                  Follow my journey and stay updated with the latest insights.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <a href="https://github.com/sstraccialini" target="_blank" rel="noopener noreferrer">
                      Follow on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.linkedin.com/in/samuele-nicolo-straccialini/" target="_blank" rel="noopener noreferrer">
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}