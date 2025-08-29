# Analyze Recommendations Command

**Purpose**: Deep analysis of recommendation quality and performance metrics

## Usage
```bash
npm run test -- --grep "recommendation.*analysis"
node scripts/test/analyze-recommendations.js
npm run dev -- --analyze-mode
```

## Analysis Types
- **Recommendation Quality**: Analyze relevance and usefulness scores
- **User Feedback Integration**: Process user acceptance/rejection patterns
- **Performance Profiling**: Analyze recommendation generation performance
- **A/B Testing Results**: Compare different recommendation algorithms

## Key Metrics
- **Relevance Score**: Average relevance of generated recommendations
- **Acceptance Rate**: Percentage of recommendations accepted by users
- **Diversity Index**: Variety of recommendation types provided
- **Personalization Effectiveness**: How well recommendations match user preferences

## Analysis Tools
- **Recommendation Scorer**: Evaluate recommendation quality
- **Performance Profiler**: Track processing times and resource usage
- **Feedback Analyzer**: Process user interaction patterns
- **Trend Detector**: Identify patterns in recommendation effectiveness

## Output Reports
- Quality metrics dashboard
- Performance optimization suggestions
- User behavior insights
- Model improvement recommendations

## Related Services
- `services/recommendations/performance-metrics-manager.ts`
- `services/recommendations/recommendations-orchestrator.ts`
- `services/cache/cache-stats-manager.ts`