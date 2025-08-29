# Validate AI Models Command

**Purpose**: Validate AI model performance and accuracy for recommendation systems

## Usage
```bash
npm run test -- --grep "ai.*model"
npm run test -- --grep "embedding.*service"
node scripts/test/validate-models.js
```

## Validation Areas
- **Embedding Quality**: Test skill and experience embeddings
- **Recommendation Accuracy**: Validate career development suggestions
- **Model Performance**: Test inference speed and resource usage
- **Data Quality**: Validate training data integrity

## AI Model Components
- **Skill Embeddings**: Vector representations of skills and competencies
- **Career Path Models**: ML models for career trajectory predictions
- **Improvement Detection**: AI analysis of CV improvement opportunities
- **Content Analysis**: NLP models for CV content understanding

## Success Metrics
- Embedding similarity scores > 0.8 for related skills
- Recommendation relevance score > 85%
- Model inference time < 500ms
- Memory usage < 512MB per request

## Related Files
- `services/ai-integration.service.ts`
- `services/embedding.service.ts`
- `services/career-development.service.ts`