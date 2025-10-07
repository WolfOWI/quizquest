// AI Story Generation Content
// (Prompt, Schemas)

import { AudienceLevel } from '../types/general/General';
import {
  getContentRegistry,
  getChapterTemplates,
  getCurriculumGenConfigByLevel,
  getCurriculumGenConfigExplain,
} from '../content';
import { Schema, getGenerativeModel } from 'firebase/ai';
import { ai } from '@/config/firebaseConfig';
import { Subject } from '../types/curriculum/Curriculum';
import { QuestionItem } from '../types/curriculum/Curriculum';

export interface StoryGenerationResponse {
  story: { description: string };
  chapters: Array<{
    title: string;
    description: string;
    chunkCount: number;
  }>;
  firstChapterQuizChunks: Array<{
    chunkSeq: number;
    items: QuestionItem[];
  }>;
}

// Create AI model for story generation
export const createNewStoryGenerationModel = () => {
  const storySchema = Schema.object({
    properties: {
      story: Schema.object({
        properties: { description: Schema.string() },
      }),
      chapters: Schema.array({
        items: Schema.object({
          properties: {
            title: Schema.string(),
            description: Schema.string(),
            chunkCount: Schema.number(),
          },
        }),
      }),
      firstChapterQuizChunks: Schema.array({
        items: Schema.object({
          properties: {
            chunkSeq: Schema.number(),
            items: Schema.array({
              items: Schema.object({
                properties: {
                  kind: Schema.enumString({ enum: ['singleSelect', 'multiSelect', 'trueFalse'] }),
                  question: Schema.string(),
                  choices: Schema.array({ items: Schema.string() }),
                  correctAnswerIndex: Schema.array({ items: Schema.number() }),
                  hint: Schema.string(),
                  explanation: Schema.string(),
                },
              }),
            }),
          },
        }),
      }),
    },
  });

  return getGenerativeModel(ai, {
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: storySchema,
      temperature: 0.3, // Low temperature for more consistent, factual content
      topP: 0.8, // Focus on most likely tokens
      topK: 40, // Limit vocabulary for consistency
      //   TODO: Max output tokens?
    },
  });
};

// Prompt for new story generation
export const getNewStoryGenPrompt = (subject: Subject, storyLevel: AudienceLevel): string => {
  const contentRegistry = getContentRegistry();
  const domain = contentRegistry.domains[subject.domainId];
  const chapterTemplates = getChapterTemplates(subject.domainId, storyLevel);
  const aiGenConfig = getCurriculumGenConfigByLevel(storyLevel);
  const aiGenConfigExplain = getCurriculumGenConfigExplain();

  // AI Difficulty Generate Config
  const chunkRange = aiGenConfig.quizChunksPerChapter;
  const qPerChunk = aiGenConfig.questionsPerQuizChunk;
  const qDist = aiGenConfig.questionTypeDistributionPercent;
  const qDifficulty = aiGenConfig.questionDifficulty;
  const qBloom = aiGenConfig.bloomWeights;

  // Explainers
  const qNegationsRateExplain = aiGenConfigExplain['questionDifficulty.negationsRate'];
  const qDistractorSimilarityExplain =
    aiGenConfigExplain['questionDifficulty.distractorSimilarity'];
  const qHintsStyleExplain = aiGenConfigExplain['hints.style'];
  const qExplanationsDepthExplain = aiGenConfigExplain['explanations.depth'];
  const qBloomWeightsExplain = aiGenConfigExplain['bloomWeights'];

  return `You are an expert educational content creator for a quiz-based learning app. Create comprehensive, high-quality quiz content with precise JSON formatting using South African English spelling.

## CONTEXT
Domain: ${domain.title}
Subject Title: ${subject.title}
Subject Description: ${subject.description}
Chapter Templates: ${chapterTemplates.join(', ')}
Difficulty Level: ${storyLevel} (${aiGenConfig.difficultyDescription})
Education Level: ${aiGenConfig.educationLevel}

## GENERATION TASKS

### 1. Story Description
Create a compelling educational description that:
- Clearly explains what the story covers based on the domain, subject, and chapter templates
- Uses age-appropriate language for ${aiGenConfig.educationLevel}
- 1 to 3 sentences long, between 100 and 300 characters
- Avoids vague terms like "comprehensive guide" or "everything about"

### 2. Chapter Titles, Descriptions, and Chunk Counts
Generate ${chapterTemplates.length} chapters that:
- Use the provided templates as a foundation (replace {subject} with the core concept)
- Create engaging, specific titles that clearly indicate chapter content
- Write 1-2 sentence descriptions that summarise what students will learn, between 100 and 200 characters
- Match the educational level: ${aiGenConfig.educationLevel}
- Provide chunkCount for each chapter (choose ${chunkRange.min}-${chunkRange.max} based on topic complexity)

### 3. First Chapter Quiz Content
Create quiz content ONLY for the first chapter with these specifications:

## CRITICAL REQUIREMENT: QUESTION COUNT
**EACH QUIZ CHUNK MUST CONTAIN EXACTLY ${qPerChunk} QUESTIONS - NO MORE, NO LESS**
This is a hard requirement that must be followed precisely.
(For example, if you create 2 chunks, each chunk will have ${qPerChunk} questions, with a total of ${qPerChunk * 2} questions)

Structure:
- Quiz chunks: Choose ${chunkRange.min}-${chunkRange.max} chunks based on topic complexity
- **Questions per chunk: EXACTLY ${qPerChunk} questions (MANDATORY)**
- Each chunk needs 'chunkSeq' (starting at 1) and 'items' array

Question Quality Standards:
- All content must match ${aiGenConfig.educationLevel} reading level
- Use clear, unambiguous language with factual accuracy only
- Ensure every question is unique and tests different aspects
- Avoid trick questions or overly complex wording
- Make questions progressively challenging within each chunk

Question Type Distribution (apply to the ${qPerChunk} questions per chunk):
- ${(qDist.singleSelect * 100).toFixed(0)}% singleSelect (8 options, 1 correct)
- ${(qDist.multiSelect * 100).toFixed(0)}% multiSelect (8 options, 2-4 correct)
- ${(qDist.trueFalse * 100).toFixed(0)}% trueFalse (True/False only)

Difficulty Parameters:
- Negations rate: ${qDifficulty.negationsRate} (${qNegationsRateExplain})
- Distractor similarity: ${qDifficulty.distractorSimilarity} (${qDistractorSimilarityExplain})

Cognitive Level Distribution:
- Remember: ${(qBloom.remember * 100).toFixed(0)}% (${qBloomWeightsExplain})
- Understand: ${(qBloom.understand * 100).toFixed(0)}%
- Apply: ${(qBloom.apply * 100).toFixed(0)}%
- Analyse: ${(qBloom.analyse * 100).toFixed(0)}%

Hints and Explanations:
- Hints style: "${aiGenConfig.hints.style}" (${qHintsStyleExplain})
- Explanation depth: "${aiGenConfig.explanations.depth}" (${qExplanationsDepthExplain})

Quality Control:
- Verify all correct answers are factually accurate
- Ensure distractors are plausible but clearly wrong
- Check that hints guide without giving away answers
- Confirm explanations provide educational value
- Use South African English spelling (e.g., "colour" not "color", "realise" not "realize")

## FINAL VALIDATION
Before returning the JSON, double-check that:
1. Each quiz chunk contains exactly ${qPerChunk} questions
2. The total number of questions in firstChapterQuizChunks equals (number of chunks × ${qPerChunk})
3. All question types are properly distributed according to the percentages
4. All questions are factually accurate and educationally valuable

## OUTPUT FORMAT
Return valid JSON with: story, chapters, firstChapterQuizChunks`;
};
