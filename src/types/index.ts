// src/types/index.ts
// Shared domain interfaces used across data files and components

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string; // path from imageLoader.ts
  linkedin?: string;
}

export interface Product {
  id: string;
  category: 'iardt' | 'vie';
  name: string;
  description: string;
  icon: string; // Iconify icon name
  coverages: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  sector: string;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: 'blue' | 'teal';
  photo: string;
}

// Additional interfaces for the application
export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface ContactInfo {
  address: string;
  phones: string[];
  email: string;
  website: string;
  hours: string;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string | number;
  label: string;
  suffix?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}