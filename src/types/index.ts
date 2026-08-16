export type ProjectCategory = 
  | 'All' 
  | 'Business & Brands' 
  | 'Events' 
  | 'Fashion & Model' 
  | 'Live Event Edits' 
  | 'Political Event' 
  | 'Wedding Industry';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  subcategory?: string;
  driveId: string;
  driveLink: string;
  client?: string;
  year?: string;
  role?: string;
  duration?: string;
  coverImage: string;
  secondaryImage?: string;
  galleryImages?: string[];
  videoUrl: string;
  beforeGradingImage?: string;
  afterGradingImage?: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  deliverables?: string[];
  toolsUsed?: string[];
  metrics?: { label: string; value: string }[];
  pastelTheme?: 'pink' | 'peach' | 'lavender' | 'yellow' | 'sage' | 'blue';
  featured?: boolean;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  pastelColor: string;
  pastelBgClass: string;
  badgeBorderClass: string;
  deliverables: string[];
  timeline: string;
  recommendedFor: string;
  sampleWorkSlug?: string;
  previewImage: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  keyDeliverables: string[];
  duration: string;
  colorClass: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl: string;
  quote: string;
  projectTitle: string;
  rating: number;
  pastelColor: string;
}

export interface GearItem {
  category: string;
  name: string;
  detail: string;
  tag: string;
}

export interface SiteConfig {
  brandName: string;
  creatorName: string;
  title: string;
  tagline: string;
  location: string;
  timezone: string;
  status: string;
  email: string;
  phone: string;
  instagram: string;
  youtube?: string;
  vimeo?: string;
  behance?: string;
  whatsapp: string;
  stats: {
    projectsCount: string;
    happyClients: string;
    viewsGenerated?: string;
    yearsExperience: string;
  };
}
