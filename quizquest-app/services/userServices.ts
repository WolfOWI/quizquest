// User Services

import { db } from '@/config/firebaseConfig';
import { User } from '@/lib/types/user/User';
import { setDoc, doc, getDoc } from 'firebase/firestore';

/**
 * Create a new user in the database
 * @param data - The user data to create
 * @returns The created user
 */
export const createUserInDb = async (userData: User) => {
  try {
    const userDocRef = doc(db, 'users', userData.uid as string);
    await setDoc(userDocRef, userData);
    return userDocRef;
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
};

/**
 * Get a user from the database
 * @param uid - The user's uid
 * @returns The user
 */
export const getUserFromDb = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.data() as User;
  } catch (error) {
    console.error('Error getting user from database:', error);
    throw error;
  }
};
