import { onCall } from 'firebase-functions/v2/https';
import { corsOptions } from '../../../../functions/src/config/cors';
import { 
  AIIntegrationService,
  RecommendationEngineService,
  CareerDevelopmentService,
  ValidationEngine,
  ImprovementOrchestrator
} from '../../src/services/root-enhanced';
import { getJobData } from '../../../../functions/src/services/jobs/job-processing';
import type { CVParsedData } from '@cvplus/core';

/**
 * Firebase Function: getRecommendations
 * Generates AI-powered CV improvement recommendations with caching and error handling
 * Maximum 180 lines to comply with code standards
 */
export const getRecommendations = onCall(
  {
    timeoutSeconds: 300,
    memory: '1GiB',
    concurrency: 10,
    ...corsOptions,
  },
  async (request) => {
    const validator = new ValidationEngine();
    const orchestrator = new ImprovementOrchestrator();
    const startTime = Date.now();

    try {
      // Validate authentication
      const authValidation = validator.validateAuth(request);
      if (!authValidation.isValid) {
        throw new Error(authValidation.error);
      }

      // Validate request data
      const { jobId, targetRole, industryKeywords, forceRegenerate } = request.data;
      const requestValidation = validator.validateRecommendationRequest({ jobId });
      if (!requestValidation.isValid) {
        throw new Error(requestValidation.errors.join('; '));
      }

      console.log(`[getRecommendations] Starting for job ${jobId}`, {
        userId: authValidation.userId,
        targetRole,
        industryKeywords,
        forceRegenerate,
        timestamp: new Date().toISOString()
      });

      // Initialize AI-powered recommendation services
      const aiService = new AIIntegrationService();
      const recommendationEngine = new RecommendationEngineService({ aiService });
      const careerService = new CareerDevelopmentService();

      // Get CV data for the job
      const cvData: CVParsedData = await getJobData(jobId, authValidation.userId);
      
      if (!cvData) {
        throw new Error(`CV data not found for job ${jobId}`);
      }

      console.log(`[getRecommendations] Analyzing CV with ${cvData.workExperience.length} experience entries`);

      // Generate comprehensive recommendations
      const analysisResult = await recommendationEngine.analyzeCVComprehensively(
        cvData,
        targetRole,
        industryKeywords
      );

      // Get career insights if target role specified
      let careerInsights = [];
      if (targetRole) {
        const roleCompatibility = await recommendationEngine.analyzeRoleCompatibility(
          cvData,
          targetRole,
          industryKeywords
        );
        
        careerInsights = await careerService.getCareerInsights(
          cvData,
          recommendationEngine.detectIndustry?.(cvData)
        );
      }

      // Prepare result
      const result = {
        success: true,
        data: {
          recommendations: analysisResult.recommendations,
          overallScore: analysisResult.overallScore,
          sectionScores: analysisResult.sectionScores,
          strengths: analysisResult.strengths,
          weaknesses: analysisResult.weaknesses,
          missingElements: analysisResult.missingElements,
          atsCompatibility: analysisResult.atsCompatibility,
          careerInsights: careerInsights.slice(0, 5), // Top 5 insights
          cached: false,
          generatedAt: new Date().toISOString(),
          processingTime: analysisResult.processingTime
        },
        timestamp: Date.now()
      };

      const processingTime = Date.now() - startTime;
      console.log(`[getRecommendations] Completed for job ${jobId}`, {
        success: result.success,
        recommendationCount: result.data?.recommendations?.length || 0,
        processingTime,
        cached: result.data?.cached || false
      });

      return result;

    } catch (error: any) {
      const processingTime = Date.now() - startTime;
      console.error(`[getRecommendations] Error for job ${request.data?.jobId}:`, {
        error: error.message,
        stack: error.stack,
        userId: request.auth?.uid,
        processingTime
      });
      
      // Return formatted error
      throw error;
    }
  }
);