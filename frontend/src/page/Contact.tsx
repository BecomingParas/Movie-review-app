import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });
  };

  return (
    <div className="min-h-screen  flex flex-col">
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
              Have questions or feedback? We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-border rounded-md bg-background"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-border rounded-md bg-background"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                          required
                        ></textarea>
                      </div>
                      <Button type="submit" className="w-full sm:w-auto">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <ContactInfo
                      icon={<Mail className="h-5 w-5" />}
                      title="Email"
                      detail="contact@reviewosaur.com"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <ContactInfo
                      icon={<Phone className="h-5 w-5" />}
                      title="Phone"
                      detail="+1 (555) 123-4567"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <ContactInfo
                      icon={<MapPin className="h-5 w-5" />}
                      title="Address"
                      detail="123 Cinema Blvd, Movie City, CA 90210"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Facebook
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, detail }) => {
  return (
    <div className="flex items-start">
      <div className="p-2 bg-accent/40 rounded-full mr-4">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
};

export default Contact;
