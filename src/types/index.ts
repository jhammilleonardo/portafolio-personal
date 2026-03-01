export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  avatar_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  years_experience: number;
  availability: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  long_description: string | null;
  repo_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  tags: string[] | string | null;
  featured: boolean | number;
  status: 'active' | 'archived' | 'wip';
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  icon: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read_at: string | null;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export type SkillsByCategory = Record<string, Skill[]>;
