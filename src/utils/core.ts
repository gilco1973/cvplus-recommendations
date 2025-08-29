/**
 * Core Utilities
 * Temporary replacements for @cvplus/core functionality
 */

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate user data (placeholder implementation)
 */
export function validateUser(user: any): boolean {
  return user && typeof user.id === 'string';
}

/**
 * Validate CV data (placeholder implementation)
 */
export function validateCVData(cvData: any): boolean {
  return cvData && typeof cvData === 'object';
}

/**
 * API Response utilities
 */
export const ApiResponse = {
  success: <T>(data: T) => ({ success: true, data }),
  error: (message: string) => ({ success: false, error: { message } })
};