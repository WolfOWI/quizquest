// AI Subject Validation Content
// (Schemas, Prompts, etc.)

import { AudienceLevel } from '../types/general/General';
import { getContentRegistry } from '../content';
import { Schema, getGenerativeModel } from 'firebase/ai';
import { ai } from '@/config/firebaseConfig';

// AI Response
export interface ValidationResponse {
  isValid: boolean;
  validityReason: string;
  subjectMatches: boolean;
  matchedSubjectId?: string;
  subjectOptions?: Array<{
    domainId: string;
    slug: string; // To be used for title as well
    subjectId: string; // Matched or created
    description: string;
  }>;
}

// Create AI model for validation
export const createValidationModel = () => {
  const validationSchema = Schema.object({
    properties: {
      isValid: Schema.boolean(),
      validityReason: Schema.string(),
      subjectMatches: Schema.boolean(),
      matchedSubjectId: Schema.string(),
      subjectOptions: Schema.array({
        items: Schema.object({
          properties: {
            domainId: Schema.string(),
            slug: Schema.string(),
            subjectId: Schema.string(),
            description: Schema.string(),
          },
        }),
      }),
    },
  });

  return getGenerativeModel(ai, {
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: validationSchema,
      temperature: 0.2, // Lower for less creativity
      topP: 0.9, // "Nucleus" sampling - sampling from the smallest set of tokens whose total probability ≥ 0.9.
      topK: 30, // "Top-K" sampling - only consider the 30 most likely next tokens; ignore the rest.

      // TODO: Determine max output tokens?  maxOutputTokens: 2048,
    },
  });
};

// TODO: Make response of validity framed in a medieval way
// Prompt
export const getValidationPrompt = (
  subject: string,
  level: AudienceLevel,
  storedSubjects: string[]
) => {
  const contentRegistry = getContentRegistry();
  const domains = contentRegistry.domains;
  const domainIds = Object.keys(domains);

  const prompt = `You are an expert educational content validator for a quiz-based learning app. Analyse the provided subject and return a structured JSON response with high accuracy using South African English spelling.

## VALIDATION TASKS

### 1. Subject Suitability Assessment
Evaluate if the subject is appropriate for quiz creation by checking:
- Educational Value: Does it have clear learning objectives and testable knowledge?
- Clarity: Is the subject specific enough to create focused questions?
- Appropriateness: Is it suitable, not offensive, nor harmful or controversial?
- Scope: Is it neither too broad nor too narrow for effective quiz generation?

Return: isValid (boolean) and validityReason (string explaining your decision)

### 2. Subject Existence Check
Check if the subject already exists via:
- Exact matches: Direct string matches (case-insensitive)
- Synonym matching: Different words for the same concept (e.g., "math" vs "mathematics")
- Regional variations: Different terms used in different regions
- Minor differences: Plural/singular, articles, slight spelling variations
- Concept matching: Same core concept expressed differently

Important: Only match if it's the EXACT SAME concept, not related or umbrella terms.

Return: subjectMatches (boolean) and matchedSubjectId (string if match found, null otherwise)

### 3. Subject Options Generation (only if subject doesn't match existing ones)
Create exactly 3 subject options:

If subject is VALID:
- Option 1: The original subject (normalised to South African English spelling and format)
- Options 2 and 3: Related but distinct subjects that complement the original (also normalised)

If subject is INVALID:
- Create 3 completely different, educationally appropriate subjects
- Ensure they're suitable for quiz generation and the target level
- All options must be normalised to South African English spelling and format

IMPORTANT: ALL subject options must be normalised according to the normalisation rules below, regardless of whether the original subject was valid or invalid.

## FORMATTING REQUIREMENTS

### Subject ID Format
- Format: "domain:subject-slug"
- Domain must be exact match from available domains: ${domainIds.join(', ')}
- Examples: "animals:monkeys", "programming:javascript"

### Subject Normalisation Rules
- Spelling: Use South African English spelling when possible
- Pluralisation: Use appropriate singular/plural forms (e.g., "Orangutan" → "orangutans")
- Terminology: Simple, clear terms (prefer single words over phrases)
- Cleanup: Remove filler words ("about", "guide to", "fundamentals of", etc.) - only core concept
- Slug: lowercase, dashes between words, no special characters
- Examples: "react-native", "hunger-games", "south-african-history", "photosynthesis", "orangutans"

### Response Structure
Each subject option must include:
- domainId: Exact domain from available list
- slug: Normalised slug (lowercase, dashes)
- subjectId: domain:subject-slug format
- description: Brief context to differentiate from homonyms or similar terms

## INPUT DATA
Subject: "${subject}"
Target Level: ${level}
Available Domains: ${domainIds.join(', ')}
Existing Subjects: ${storedSubjects.join(', ')}

## OUTPUT FORMAT
Return valid JSON with: isValid, validityReason, subjectMatches, matchedSubjectId, subjectOptions (array of 3 if no match)`;

  return prompt;
};
