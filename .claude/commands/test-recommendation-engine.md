# Test Recommendation Engine Command

**Purpose**: Test the AI-powered recommendation engine with comprehensive validation

## Usage
```bash
npm run test -- --grep "recommendation.*engine"
npm run test:coverage -- --grep "ai.*integration"
```

## Test Categories
- **AI Model Validation**: Test recommendation algorithm accuracy
- **Performance Testing**: Validate response times and throughput
- **Edge Case Testing**: Test with unusual CV inputs
- **Integration Testing**: Test with Firebase and external APIs

## Success Criteria
- All recommendation tests pass
- Coverage > 90% for AI integration services
- Response times < 2 seconds for standard CV analysis
- Proper error handling for invalid inputs

## Related Services
- `ai-integration.service.ts`
- `recommendation-engine.service.ts`
- `career-development.service.ts`