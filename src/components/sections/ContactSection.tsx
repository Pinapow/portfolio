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
import emailjs from "@emailjs/browser";
import { Send, CheckCircle } from "lucide-react";
import { FormData } from "@/types";
import { contactInfo, socialLinks } from "@/data/contact";
import { motion } from "motion/react";

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", message: "" },
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
        publicKey,
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
    <section id="contact" className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background/50 z-0"></div>

      {/* Decorative blurred background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Contact
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 font-light">
            Ready to bring your ideas to life? Let&apos;s discuss your project
            and explore how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground/90 leading-relaxed font-light text-lg">
                I&apos;m always interested in new opportunities, collaborations,
                and challenging projects. Whether you&apos;re looking for a
                technical consultant, full-stack developer, or just want to chat
                about technology, feel free to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className="flex items-center gap-6 p-4 rounded-2xl bg-secondary/20 border border-white/5 backdrop-blur-sm hover:bg-secondary/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground/80 font-medium mb-1">
                      {info.label}
                    </div>
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
                        className="text-foreground hover:text-primary transition-colors font-semibold text-lg"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-foreground font-semibold text-lg">
                        {info.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-heading font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary/30"></span> Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary/40 border border-white/5 hover:border-primary/50 hover:bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-black/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-foreground/80" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20"
            >
              <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-primary animate-pulse" />
                <div>
                  <div className="font-heading font-semibold">
                    Quick Response Time
                  </div>
                  <div className="text-sm text-muted-foreground/80 font-light">
                    I typically respond within 4-6 hours during business days
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:h-full flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="flex-1 bg-secondary/20 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-300 hover:shadow-primary/5">
              <CardHeader className="p-8 border-b border-white/5 bg-secondary/10">
                <CardTitle className="font-heading text-2xl">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-muted-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                        className={cn(
                          "bg-background/50 border-white/10 h-12 rounded-xl transition-all duration-300 focus:bg-background/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/30",
                          errors.name &&
                            "border-destructive focus:ring-destructive/20",
                        )}
                        {...register("name", {
                          required: "Full name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-muted-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        className={cn(
                          "bg-background/50 border-white/10 h-12 rounded-xl transition-all duration-300 focus:bg-background/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/30",
                          errors.email &&
                            "border-destructive focus:ring-destructive/20",
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
                        <p className="text-xs text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      rows={6}
                      aria-invalid={errors.message ? "true" : "false"}
                      className={cn(
                        "resize-none bg-background/50 border-white/10 rounded-xl transition-all duration-300 focus:bg-background/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/30 p-4",
                        errors.message &&
                          "border-destructive focus:ring-destructive/20",
                      )}
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 rounded-xl text-[15px] font-semibold tracking-wide"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-3" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
