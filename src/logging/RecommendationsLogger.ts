/**
 * T034: Recommendations logging in packages/recommendations/src/logging/RecommendationsLogger.ts
 *
 * Specialized logger for AI recommendations and ML model events
 */

import { RecommendationsLogger as BaseRecommendationsLogger, recommendationsLogger } from '@cvplus/core';

// Re-export the recommendations logger
export { recommendationsLogger };
export default recommendationsLogger;