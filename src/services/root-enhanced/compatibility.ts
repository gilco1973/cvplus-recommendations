/**
 * Compatibility Layer for Migrated Services
 * 
 * Provides type aliases and service mappings to ensure compatibility 
 * with services migrated from the root functions directory.
 * 
 * @author Gil Klainert
 * @migrated 2025-08-29
 */

import { CVParsedData } from '../../types';
import { Recommendation } from '../../types';

// ============================================================================
// TYPE ALIASES FOR COMPATIBILITY
// ============================================================================

// Map root function types to submodule types
export type CVRecommendation = Recommendation;
export type ParsedCV = CVParsedData;

// Placeholder manager interface for compatibility
export interface PlaceholderReplacementMap {
  [placeholder: string]: string;
}

export interface PlaceholderManager {
  replacePlaceholders(content: string, replacements: PlaceholderReplacementMap): string;
  extractPlaceholders(content: string): string[];
  validatePlaceholders(content: string, replacements: PlaceholderReplacementMap): boolean;
}

// ============================================================================
// MOCK SERVICE IMPLEMENTATIONS FOR COMPATIBILITY
// ============================================================================

/**
 * Temporary CV Transformation Service for compatibility
 * This service provides minimal functionality until full migration
 */
export class CVTransformationService {
  static async transformCV(cvData: CVParsedData, recommendations: Recommendation[]): Promise<CVParsedData> {
    // Basic transformation - applies recommendations to CV data
    const transformedCV = { ...cvData };
    
    // For now, return the original CV data
    // TODO: Implement actual transformation logic
    return transformedCV;
  }
  
  static async generateRecommendations(cvData: CVParsedData, targetRole?: string): Promise<Recommendation[]> {
    // Basic recommendation generation
    // TODO: Implement actual recommendation logic
    return [];
  }
}

/**
 * Simple placeholder manager implementation
 */
export class SimplePlaceholderManager implements PlaceholderManager {
  replacePlaceholders(content: string, replacements: PlaceholderReplacementMap): string {
    let result = content;
    
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
      result = result.replace(regex, value);
    });
    
    return result;
  }
  
  extractPlaceholders(content: string): string[] {
    const matches = content.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
  }
  
  validatePlaceholders(content: string, replacements: PlaceholderReplacementMap): boolean {
    const placeholders = this.extractPlaceholders(content);
    return placeholders.every(placeholder => placeholder in replacements);
  }
}

// ============================================================================
// SERVICE FACTORY FOR DEPENDENCY INJECTION
// ============================================================================

export class ServiceFactory {
  private static placeholderManager: PlaceholderManager = new SimplePlaceholderManager();
  
  static getPlaceholderManager(): PlaceholderManager {
    return this.placeholderManager;
  }
  
  static setPlaceholderManager(manager: PlaceholderManager): void {
    this.placeholderManager = manager;
  }
}

// ============================================================================
// COMPATIBILITY EXPORTS
// ============================================================================

// Re-export commonly used types
export type {
  CVParsedData,
  Recommendation,
  RecommendationType,
  CVSection,
  ActionType,
  ImpactLevel
} from '../../types';