'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  excerpt: string;
}

export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title,
      text: excerpt,
      url: window.location.href,
    };

    try {
      // Try to use the native Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Article URL copied to clipboard!');
      }
    } catch (error) {
      // Final fallback: manual copy
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Article URL copied to clipboard!');
    }
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleShare}>
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  );
}
