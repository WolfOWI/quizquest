import { AudienceLevel, SourceType } from '../types/general/General';

// ID BUILDERS
// Subject ID format: domainId:subjectSlug (e.g. animals:monkeys)
export const buildSubjectId = (domainId: string, subjectSlug: string) => {
  return `${domainId}:${subjectSlug}`;
};

// Story ID format: subjectId__level (e.g. animals:monkeys__novice__gen)
export const buildStoryId = (subjectId: string, level: AudienceLevel, source: SourceType) => {
  return `${subjectId}__${level}__${source}`;
};

// Chapter ID format: storyId__ch<seq> (e.g. animals:monkeys__novice__gen__ch1)
export const buildChapterId = (storyId: string, seq: number) => {
  return `${storyId}__ch${seq}`;
};

// QuizChunk ID format: chapterId__ck<seq> (e.g. animals:monkeys__novice__gen__ch1__ck1)
export const buildQuizChunkId = (chapterId: string, seq: number) => {
  return `${chapterId}__ck${seq}`;
};
