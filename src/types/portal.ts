/**
 * Portal Types
 * Type definitions for the portal/dashboard interfaces
 */

export interface RAGEmbedding {
  id: string;
  content: string;
  embedding: number[];
  vector?: number[];
  tokens?: number;
  metadata: EmbeddingMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmbeddingMetadata {
  sourceDocument: string;
  documentType: ContentType;
  section: CVSection;
  chunkIndex: number;
  wordCount: number;
  confidence: number;
  importance?: number;
  tags?: string[];
  source?: string;
  dateRange?: string;
  subsection?: string;
  createdAt?: Date;
}

export enum ContentType {
  CV_SECTION = 'cv_section',
  JOB_DESCRIPTION = 'job_description',
  RECOMMENDATION = 'recommendation',
  TEMPLATE = 'template',
  EXAMPLE = 'example'
}

export enum CVSection {
  PERSONAL_INFO = 'personal_info',
  PROFESSIONAL_SUMMARY = 'professional_summary', 
  EXPERIENCE = 'experience',
  SKILLS = 'skills',
  EDUCATION = 'education',
  ACHIEVEMENTS = 'achievements',
  CERTIFICATIONS = 'certifications',
  PROJECTS = 'projects',
  LANGUAGES = 'languages',
  REFERENCES = 'references'
}

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PREMIUM = 'premium',
  GUEST = 'guest'
}

export enum Permission {
  READ_CV = 'read_cv',
  WRITE_CV = 'write_cv',
  DELETE_CV = 'delete_cv',
  ADMIN_PORTAL = 'admin_portal',
  PREMIUM_FEATURES = 'premium_features'
}

export interface SearchRequest {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
}

export interface SearchFilters {
  contentType?: ContentType[];
  section?: CVSection[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minConfidence?: number;
}

export interface SearchResult {
  id: string;
  content: string;
  score: number;
  metadata: EmbeddingMetadata;
  highlights?: string[];
}