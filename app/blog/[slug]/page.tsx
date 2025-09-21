import { notFound } from 'next/navigation';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAvatarImagePath } from '@/lib/assets';
import ShareButton from '@/components/share-button';
import { getBlogPostById, BlogPost, getAllBlogPosts } from '@/lib/blog';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostById(slug);

  if (!post) {
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
              <Link href="/blog" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="outline">Featured</Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <Card className="mb-12">
              <CardContent className="p-8">
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={getAvatarImagePath()}
                      alt="Samuele Nicolò Straccialini"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{post.author}</h3>
                    <p className="text-muted-foreground">
                      AI student passionate about machine learning and software development. 
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2">Share this article</h3>
                    <p className="text-sm text-muted-foreground">
                      Found this helpful? Share it with others!
                    </p>
                  </div>
                  <ShareButton title={post.title} excerpt={post.excerpt} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.id,
  }));
}