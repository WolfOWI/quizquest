// User Story Services
// (Managing ownedStories for users)

import { db } from '@/config/firebaseConfig';
import { UserOwnedStory } from '@/lib/types/user/User';
import { Story, SubjectId } from '@/lib/types/curriculum/Curriculum';
import { Timestamp } from 'firebase/firestore';
import { setDoc, doc, getDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import { getDomainIdFromSubjectId } from '@/lib/utils/curriculumUtils';

// ========= OWNED STORY SERVICES =========
/**
 * Add a story to user's ownedStories collection
 */
export const addStoryToUserOwnedStories = async (
  userId: string,
  story: Story
): Promise<UserOwnedStory> => {
  try {
    const ownedStory: UserOwnedStory = {
      storyId: story.storyId,
      acquiredAt: Timestamp.now(),
      domainId: getDomainIdFromSubjectId(story.subjectId as SubjectId),
      subjectId: story.subjectId,
      subjectTitle: story.subjectTitle,
      level: story.level,
    };

    const ownedStoryDocRef = doc(db, 'users', userId, 'ownedStories', story.storyId!);
    await setDoc(ownedStoryDocRef, ownedStory);

    return ownedStory;
  } catch (error) {
    console.error('Error adding story to user ownedStories:', error);
    throw error;
  }
};

/**
 * Get all owned stories for a user
 */
export const getUserOwnedStories = async (userId: string): Promise<UserOwnedStory[]> => {
  try {
    const ownedStoriesQuery = query(
      collection(db, 'users', userId, 'ownedStories'),
      orderBy('acquiredAt', 'desc')
    );
    const ownedStoriesSnapshot = await getDocs(ownedStoriesQuery);

    return ownedStoriesSnapshot.docs.map(
      (doc) =>
        ({
          storyId: doc.id,
          ...doc.data(),
        }) as UserOwnedStory
    );
  } catch (error) {
    console.error('Error getting user owned stories:', error);
    throw error;
  }
};

/**
 * Get owned stories grouped by domain
 */
export const getUserOwnedStoriesByDomain = async (
  userId: string
): Promise<Record<string, UserOwnedStory[]>> => {
  try {
    const ownedStories = await getUserOwnedStories(userId);

    // Group stories by domain
    const storiesByDomain: Record<string, UserOwnedStory[]> = {};

    ownedStories.forEach((story) => {
      if (!storiesByDomain[story.domainId]) {
        storiesByDomain[story.domainId] = [];
      }
      storiesByDomain[story.domainId].push(story);
    });

    return storiesByDomain;
  } catch (error) {
    console.error('Error getting user owned stories by domain:', error);
    throw error;
  }
};

/**
 * Check if user owns a specific story
 */
export const checkUserOwnsStory = async (userId: string, storyId: string): Promise<boolean> => {
  try {
    const ownedStoryDoc = await getDoc(doc(db, 'users', userId, 'ownedStories', storyId));
    return ownedStoryDoc.exists();
  } catch (error) {
    console.error('Error checking if user owns story:', error);
    throw error;
  }
};
