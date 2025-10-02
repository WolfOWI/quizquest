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
    domainSlug: string;
    slug: string;
    subjectId: string; // Matched or created
    title: string;
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
            domainSlug: Schema.string(),
            slug: Schema.string(),
            subjectId: Schema.string(),
            title: Schema.string(),
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
    },
  });
};

// Prompt
export const getValidationPrompt = (
  subject: string,
  level: AudienceLevel,
  storedSubjects: string[]
) => {
  const contentRegistry = getContentRegistry();
  const domains = contentRegistry.domains;
  const domainSlugs = Object.keys(domains);

  const prompt = `You are an educational content validator for a quiz-based learning app. Analyse the provided subject and return a structured JSON response.

## VALIDATION TASKS

### 1. Subject Suitability Assessment
- Evaluate if the subject is appropriate for quiz creation
- Consider educational value and clarity.
- Return: isValid (boolean) and validityReason (string)

### 2. Subject Existence Check
- Check if the subject already exists in the provided subject list
- Use fuzzy matching for synonyms, regional variations, and minor word differences
- Match only if it's the SAME concept (not umbrella terms or different concepts)
- Return: subjectMatches (boolean) and matchedSubjectId (string|null)

### 3. Subject Options Generation (only if subject doesn't match)
If subject doesn't exist, create 3 subject options:

**If subject is VALID:**
- Create 1 option for the original subject + 2 related alternatives
- All 3 should be distinct concepts but thematically related, and categorisable into a domain from the list of available domains.

**If subject is INVALID:**
- Create 3 alternative valid subjects that are educationally appropriate

## FORMATTING REQUIREMENTS

### Subject ID Format
- Must be: domain:subject-slug
- Domain must be exact match from available domains
- Examples: "animals:monkeys", "programming:javascript"

### Subject Normalisation
- Use South African English when possible (when generating content)
- Proper pluralisation
- Simple, clear terminology (prefer single words)
- Remove filler words ("about", "guide to", etc.)
- Slug: lowercase, dashes between words
- Title: Proper case with spaces (short, direct and heavily based on subject slug, no educational filler terms like "guide to", "fundamentals", etc.)

### Response Structure
Each subject option must include:
- domainSlug: Exact domain from available list
- slug: Normalized slug (lowercase, dashes)
- subjectId: domain:subject-slug format
- title: Proper case title (heavily based on subject slug, no educational filler terms like "guide to", "fundamentals", etc.)
- description: Brief context to differentiate from homonyms

## INPUT DATA
Subject: "${subject}"
Target Level: ${level}
Available Domains: ${domainSlugs.join(', ')}
Existing Subjects: ${storedSubjects.join(', ')}

## OUTPUT FORMAT
Return JSON with: isValid, validityReason, subjectMatches, matchedSubjectId, subjectOptions (array of 3 if no match)`;

  return prompt;
};
