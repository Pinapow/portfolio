import { Mail, Phone, MapPin, Clock, Linkedin, Github } from "lucide-react";
import { ContactInfo, SocialLink } from "@/types";

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "phuong.le77100@gmail.com",
    href: "mailto:phuong.le77100@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+33 6 95 32 43 98",
    href: "tel:+33695324398",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Meaux, Seine-et-Marne, France",
    href: "https://maps.app.goo.gl/zY8ZEXHXCMJWLW118",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Mon - Fri, 9AM - 6PM UTC+2",
    href: null,
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/phuong-le77100",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/phuong-le-tech",
  },
];
