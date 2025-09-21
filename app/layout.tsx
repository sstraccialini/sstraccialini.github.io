import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Samuele Nicolò Straccialini - AI Student & Developer',
  description: 'AI student building real-world solutions. Seeking internship opportunities in AI/ML and software development.',
  keywords: ['AI', 'Machine Learning', 'Software Development', 'Internship', 'Computer Science'],
  authors: [{ name: 'Samuele Nicolò Straccialini' }],
  openGraph: {
    title: 'Samuele Nicolò Straccialini - AI Student & Developer',
    description: 'AI student building real-world solutions. Seeking internship opportunities in AI/ML and software development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}