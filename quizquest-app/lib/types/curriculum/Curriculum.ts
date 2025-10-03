// Curriculum Types
import { Timestamp } from 'firebase/firestore';
import { AudienceLevel, SourceType } from '../general/General';

// Flattened hierarchy, but hierarchy can be seen as:
// Domains -> Subjects -> Stories -> Chapters -> QuizChunks (Questions & Answers)

// Custom Id types
export type SubjectId = `${string}:${string}`;
export type StoryId = `${SubjectId}__${AudienceLevel}__${SourceType}`;
export type ChapterId = `${StoryId}__ch${number}`;
export type QuizChunkId = `${ChapterId}__ck${number}`;

// Subjects / Topics (e.g. Squirrels, React Native) - grouping stories of different levels
// subjects/{subjectId}
export interface Subject {
  subjectId?: SubjectId; // <domainSlug>:<subjectSlug>
  domainId: string; // Catalog key
  title: string;
  titleLower: string;
  slug: string;
  description: string;
  levelsAvailable: AudienceLevel[];
  latestStoryUpdatedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Selectable level variant under a subject (e.g. React Native) with difficulty level & author
// stories/{storyId}
export interface Story {
  storyId?: StoryId; // <subjectId>__<level>__<source>
  subjectId: string; // Foreign key to subjects/{subjectId}
  subjectTitle: string; // Denormalised from subjects/{subjectId}
  description: string; // Story's own description
  level: AudienceLevel;
  source: SourceType;
  authorUid: string; // Foreign key to users/{uid}
  chapterCount: number;
  questionCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// The chapters inside a story (e.g. React Native Terminology, React Native Hooks)
// chapters/{chapterId}
export interface Chapter {
  chapterId?: ChapterId; // <storyId>__ch<seq>
  storyId: string; // Foreign key to stories/{storyId}
  title: string;
  description: string;
  seq: number;
  environmentId: string; // Catalog key
  questionCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// A chunk of the actual quiz questions inside a chapter (max 10 questions per chunk)
// quizChunks/{quizChunkId}
export interface QuizChunk {
  quizChunkId?: QuizChunkId; // <chapterId>__ck<seq>
  chapterId: string; // Foreign key to chapters/{chapterId}
  chunkSeqNum: number;
  items: QuestionItem[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface QuestionItem {
  kind: QuestionItemKind;
  question: string;
  choices: string[];
  correctAnswerIndex: number[];
  hint: string;
  explanation: string;
}

export type QuestionItemKind = 'singleSelect' | 'multiSelect' | 'trueFalse';
