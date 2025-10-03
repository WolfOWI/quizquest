// Curriculum Database Services
// (Subjects, Stories, Chapters, QuizChunks)

import { db } from '@/config/firebaseConfig';
import { Subject, Story, Chapter, QuizChunk } from '@/lib/types/curriculum/Curriculum';
import { setDoc, doc, getDoc, where, getDocs, query, collection } from 'firebase/firestore';

// ========= COMBINATION FUNCTIONALITY =========

// ========= SUBJECT SERVICES =========
/**
 * Create and return a newly created subject with custom ID
 */
export const createSubjectWithId = async (subject: Subject, subjectId: string) => {
  try {
    const subjectDocRef = doc(db, 'subjects', subjectId);
    await setDoc(subjectDocRef, subject);
    return { ...subject, id: subjectDocRef.id };
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
    return subjectDoc.data() as Subject;
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

// ========= STORY SERVICES =========
/**
 * Create and return a newly created story with custom ID
 */
export const createStoryWithId = async (story: Story, storyId: string) => {
  try {
    const storyDocRef = doc(db, 'stories', storyId);
    await setDoc(storyDocRef, story);
    return { ...story, id: storyDocRef.id };
  } catch (error) {
    throw error;
  }
};

/**
 * Get all stories by subject ID
 */
export const getStoriesBySubjectId = async (subjectId: string) => {
  try {
    const storiesQuery = query(collection(db, 'stories'), where('subjectId', '==', subjectId));
    const storiesSnapshot = await getDocs(storiesQuery);
    return storiesSnapshot.docs.map((doc) => doc.data());
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
    return storyDoc.data() as Story;
  } catch (error) {
    throw error;
  }
};

// ========= CHAPTER SERVICES =========
/**
 * Create and return a newly created chapter with custom ID
 */
export const createChapterWithId = async (chapter: Chapter, chapterId: string) => {
  try {
    const chapterDocRef = doc(db, 'chapters', chapterId);
    await setDoc(chapterDocRef, chapter);
    return { ...chapter, id: chapterDocRef.id };
  } catch (error) {
    throw error;
  }
};

// ========= QUIZ CHUNK SERVICES =========
/**
 * Create and return a newly created quiz chunk with custom ID
 */
export const createQuizChunkWithId = async (quizChunk: QuizChunk, quizChunkId: string) => {
  try {
    const quizChunkDocRef = doc(db, 'quizChunks', quizChunkId);
    await setDoc(quizChunkDocRef, quizChunk);
    return { ...quizChunk, id: quizChunkDocRef.id };
  } catch (error) {
    throw error;
  }
};
