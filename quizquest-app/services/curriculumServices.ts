// Curriculum Database Services
// (Subjects, Stories, Chapters, QuizChunks)

import { db } from '@/config/firebaseConfig';
import { Subject, Story, Chapter, QuizChunk } from '@/lib/types/curriculum/Curriculum';
import { setDoc, doc, getDoc, where, getDocs, query, collection } from 'firebase/firestore';

// ========= COMBINATION FUNCTIONALITY =========

// ========= SUBJECT SERVICES =========
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

// ========= QUIZ CHUNK SERVICES =========
