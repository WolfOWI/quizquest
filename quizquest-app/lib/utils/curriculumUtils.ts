import { AudienceLevel, SourceType } from '../types/general/General';
import { SubjectId, StoryId, ChapterId, QuizChunkId } from '../types/curriculum/Curriculum';
import { Domain } from '../types/content/ContentTypes';

// ======= ID BUILDERS =======
// Subject ID format: domainId:subjectSlug (e.g. animals:monkeys)
export const buildSubjectId = (domainId: string, subjectSlug: string) => {
  return `${domainId}:${subjectSlug}` as SubjectId;
};

// Story ID format: subjectId__level (e.g. animals:monkeys__novice__gen)
export const buildStoryId = (subjectId: string, level: AudienceLevel, source: SourceType) => {
  return `${subjectId}__${level}__${source}` as StoryId;
};

// Chapter ID format: storyId__ch<seq> (e.g. animals:monkeys__novice__gen__ch1)
export const buildChapterId = (storyId: string, seq: number) => {
  return `${storyId}__ch${seq}` as ChapterId;
};

// QuizChunk ID format: chapterId__ck<seq> (e.g. animals:monkeys__novice__gen__ch1__ck1)
export const buildQuizChunkId = (chapterId: string, seq: number) => {
  return `${chapterId}__ck${seq}` as QuizChunkId;
};

// ======= ID BREAKERS =======
export const getDomainIdFromSubjectId = (subjectId: SubjectId) => {
  return subjectId.split(':')[0] as Domain['id'];
};

export const getSubjectIdFromStoryId = (storyId: StoryId) => {
  return storyId.split('__')[0] as SubjectId;
};

export const getStoryIdFromChapterId = (chapterId: ChapterId) => {
  return chapterId.split('__')[0] as StoryId;
};
