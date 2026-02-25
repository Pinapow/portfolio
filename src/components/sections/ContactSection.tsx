"use client";

import React, { useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';
import {
  Send,
  CheckCircle,
} from "lucide-react";
import { FormData } from "@/types";
import { contactInfo, socialLinks } from "@/data/contact";

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      if (!formRef.current) {
        throw new Error("Form reference is not available");
      }

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.status === 200) {
        toast({
          title: "Message sent successfully!",
          description:
            "Thank you for reaching out. I'll get back to you within 24 hours.",
          duration: 5000,
        });
        reset();
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
    } catch (error) {
      console.error("Failed to send email:", error);

      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30 relative">
      {/* Contact-specific gradient background */}
      <div className="absolute inset-0 gradient-bg-contact"></div>
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s discuss your
            project and explore how we can work together to create something
            amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-in">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always interested in new opportunities,
                collaborations, and challenging projects. Whether you&apos;re
                looking for a technical consultant, full-stack developer, or
                just want to chat about technology, feel free to reach
                out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-muted-foreground">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <Card className="mt-8 border-primary/20 animate-fade-up">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Quick Response Time</div>
                    <div className="text-sm text-muted-foreground">
                      I typically respond within 4-6 hours during business days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                        className={cn(
                          "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                          errors.name && "border-destructive focus:ring-destructive/20"
                        )}
                        {...register("name", {
                          required: "Full name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" },
                        })}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        className={cn(
                          "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                          errors.email && "border-destructive focus:ring-destructive/20"
                        )}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Project Discussion"
                      aria-invalid={errors.subject ? "true" : "false"}
                      className={cn(
                        "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        errors.subject && "border-destructive focus:ring-destructive/20"
                      )}
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: { value: 3, message: "Subject must be at least 3 characters" },
                      })}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      rows={6}
                      aria-invalid={errors.message ? "true" : "false"}
                      className={cn(
                        "resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        errors.message && "border-destructive focus:ring-destructive/20"
                      )}
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 10, message: "Message must be at least 10 characters" },
                      })}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
