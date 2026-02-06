// Shared TypeScript interfaces for the portfolio

export interface ProjectMetrics {
  performance: number;
  users: string;
  uptime: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile';
  liveUrl?: string;
  githubUrl: string;
  metrics?: ProjectMetrics;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Languages' | 'Database' | 'DevOps' | 'Frontend' | 'Backend';
  color?: string;
}

export interface ExpertiseArea {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  technologies: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  companyLogo?: string;
  companyWebsite?: string;
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string | null;
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}