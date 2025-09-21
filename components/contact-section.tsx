'use client';

import { useState } from 'react';
import { Github, Mail, Linkedin, Send, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Create mailto link with form data
    const subject = encodeURIComponent(`Message from ${formData.name} via Portfolio Website`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:stra.samuele@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and clear form
    toast.success('Email client opened! Please send the email from your email app.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent('Contact from Portfolio Website');
    const body = encodeURIComponent('Hi Samuele,\n\nI would like to get in touch regarding...\n\n');
    const mailtoLink = `mailto:stra.samuele@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about AI and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Milan, Italy</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a href="mailto:stra.samuele@gmail.com" className="hover:text-primary transition-colors">
                  stra.samuele@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button size="sm" variant="outline" asChild>
                  <a href="https://github.com/sstraccialini" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                
                <Button size="sm" variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/samuele-nicolo-straccialini/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-2">Current Status</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    Available for internship opportunities
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={handleDirectEmail}
                >
                  <Mail className="w-4 h-4" />
                  Open Email Client Directly
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}