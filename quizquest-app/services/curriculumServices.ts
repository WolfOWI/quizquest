// Curriculum Database Services
// (Subjects, Stories, Chapters, QuizChunks)

import { db } from '@/config/firebaseConfig';
import { Subject, Story, Chapter, QuizChunk } from '@/lib/types/curriculum/Curriculum';
import { AudienceLevel, SourceType } from '@/lib/types/general/General';
import { buildStoryId } from '@/lib/utils/curriculumUtils';
import {
  setDoc,
  doc,
  getDoc,
  where,
  getDocs,
  query,
  collection,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

// ========= COMBINATION FUNCTIONALITY =========

// ========= SUBJECT SERVICES =========
/**
 * Create and return a newly created subject with custom ID
 */
export const createSubjectWithId = async (subject: Subject, subjectId: string) => {
  try {
    const subjectDocRef = doc(db, 'subjects', subjectId);
    await setDoc(subjectDocRef, subject);
    return {
      subjectId: subjectDocRef.id,
      ...subject,
    } as Subject;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a subject by id
 */
export const getSubjectById = async (subjectId: string): Promise<Subject> => {
  try {
    const subjectDoc = await getDoc(doc(db, 'subjects', subjectId));
    return {
      subjectId: subjectDoc.id,
      ...subjectDoc.data(),
    } as Subject;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if a subject already exists
 */
export const checkSubjectExists = async (subjectId: string) => {
  try {
    const subjectDoc = await getDoc(doc(db, 'subjects', subjectId));
    return subjectDoc.exists();
  } catch (error) {
    throw error;
  }
};

/**
 * Get an array of all subjects doc ids as strings
 */
export const getSubjectsDocIds = async () => {
  try {
    const subjectsQuery = query(collection(db, 'subjects'));
    const subjectsSnapshot = await getDocs(subjectsQuery);
    return subjectsSnapshot.docs.map((doc) => doc.id);
  } catch (error) {
    throw error;
  }
};

/**
 * Update a subject doc based on what is passed in (and return the updated subject)
 */
export const updateSubjectDocById = async (subjectId: string, data: Partial<Subject>) => {
  try {
    const subjectDocRef = doc(db, 'subjects', subjectId);
    await updateDoc(subjectDocRef, data);

    // Get the updated subject
    const subjectDoc = await getDoc(subjectDocRef);
    return {
      subjectId: subjectDoc.id,
      ...subjectDoc.data(),
    } as Subject;
  } catch (error) {
    throw error;
  }
};

// ========= STORY SERVICES =========
/**
 * Create a story with custom ID (and return the created story)
 */
export const createStoryWithId = async (story: Story, storyId: string) => {
  try {
    const storyDocRef = doc(db, 'stories', storyId);
    await setDoc(storyDocRef, story);

    // Get the created story
    const storyDoc = await getDoc(storyDocRef);
    return {
      storyId: storyDoc.id,
      ...storyDoc.data(),
    } as Story;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all stories by subject ID (and return the stories as an array of Story objects)
 */
export const getAllStoriesBySubjectId = async (subjectId: string) => {
  try {
    const storiesQuery = query(collection(db, 'stories'), where('subjectId', '==', subjectId));
    const storiesSnapshot = await getDocs(storiesQuery);
    return storiesSnapshot.docs.map(
      (doc) =>
        ({
          storyId: doc.id,
          ...doc.data(),
        }) as Story
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Get a story by subject ID and level (novice / apprentice / master)
 */
export const getStoryBySubjectIdLevelSource = async (
  subjectId: string,
  level: AudienceLevel,
  source: SourceType
): Promise<Story> => {
  try {
    const storyDoc = await getDoc(doc(db, 'stories', buildStoryId(subjectId, level, source)));
    if (!storyDoc.exists()) {
      throw new Error('Story not found');
    }
    return {
      storyId: storyDoc.id,
      ...storyDoc.data(),
    } as Story;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a story by id
 */
export const getStoryById = async (storyId: string): Promise<Story> => {
  try {
    const storyDoc = await getDoc(doc(db, 'stories', storyId));
    return {
      storyId: storyDoc.id,
      ...storyDoc.data(),
    } as Story;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a story doc based on what is passed in (and return the updated story)
 */
export const updateStoryDocById = async (storyId: string, data: Partial<Story>) => {
  try {
    const storyDocRef = doc(db, 'stories', storyId);
    await updateDoc(storyDocRef, data);

    // Get the updated story
    const storyDoc = await getDoc(storyDocRef);
    return {
      storyId: storyDoc.id,
      ...storyDoc.data(),
    } as Story;
  } catch (error) {
    throw error;
  }
};

// ========= CHAPTER SERVICES =========
/**
 * Create a chapter with custom ID (and return the created chapter)
 */
export const createChapterWithId = async (chapter: Chapter, chapterId: string) => {
  try {
    const chapterDocRef = doc(db, 'chapters', chapterId);
    await setDoc(chapterDocRef, chapter);

    // Get the created chapter
    const chapterDoc = await getDoc(chapterDocRef);
    return {
      chapterId: chapterDoc.id,
      ...chapterDoc.data(),
    } as Chapter;
  } catch (error) {
    throw error;
  }
};

/**
 * Create multiple chapters with custom IDs (and return the created chapters)
 */
export const createMultipleChaptersWithIds = async (chapters: Chapter[], chapterIds: string[]) => {
  try {
    const batch = writeBatch(db);
    const createdChapters: Chapter[] = [];

    // Add all chapters to the batch
    chapters.forEach((chapter, index) => {
      const chapterDocRef = doc(db, 'chapters', chapterIds[index]);
      batch.set(chapterDocRef, chapter);
      createdChapters.push({
        ...chapter,
        chapterId: chapterIds[index],
      } as Chapter);
    });

    // Commit the batch
    await batch.commit();

    return createdChapters;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all chapters for a story
 */
export const getAllChaptersByStoryId = async (storyId: string) => {
  try {
    const chaptersQuery = query(collection(db, 'chapters'), where('storyId', '==', storyId));
    const chaptersSnapshot = await getDocs(chaptersQuery);
    return chaptersSnapshot.docs.map(
      (doc) =>
        ({
          chapterId: doc.id,
          ...doc.data(),
        }) as Chapter
    );
  } catch (error) {
    throw error;
  }
};

// ========= QUIZ CHUNK SERVICES =========
/**
 * Create a quiz chunk with custom ID (and return the created quiz chunk)
 */
export const createQuizChunkWithId = async (quizChunk: QuizChunk, quizChunkId: string) => {
  try {
    const quizChunkDocRef = doc(db, 'quizChunks', quizChunkId);
    await setDoc(quizChunkDocRef, quizChunk);

    // Get the created quiz chunk
    const quizChunkDoc = await getDoc(quizChunkDocRef);
    return {
      quizChunkId: quizChunkDoc.id,
      ...quizChunkDoc.data(),
    } as QuizChunk;
  } catch (error) {
    throw error;
  }
};

/**
 * Create multiple quiz chunks with custom IDs (and return the created quiz chunks)
 */
export const createMultipleQuizChunksWithIds = async (
  quizChunks: QuizChunk[],
  quizChunkIds: string[]
) => {
  try {
    const batch = writeBatch(db);
    const createdQuizChunks: QuizChunk[] = [];

    // Add all quiz chunks to the batch
    quizChunks.forEach((quizChunk, index) => {
      const quizChunkDocRef = doc(db, 'quizChunks', quizChunkIds[index]);
      batch.set(quizChunkDocRef, quizChunk);
      createdQuizChunks.push({
        ...quizChunk,
        quizChunkId: quizChunkIds[index],
      } as QuizChunk);
    });

    // Commit the batch
    await batch.commit();

    return createdQuizChunks;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all quiz chunks for a chapter
 */
export const getAllQuizChunksByChapterId = async (chapterId: string) => {
  try {
    const quizChunksQuery = query(
      collection(db, 'quizChunks'),
      where('chapterId', '==', chapterId)
    );
    const quizChunksSnapshot = await getDocs(quizChunksQuery);
    return quizChunksSnapshot.docs.map(
      (doc) =>
        ({
          quizChunkId: doc.id,
          ...doc.data(),
        }) as QuizChunk
    );
  } catch (error) {
    throw error;
  }
};
