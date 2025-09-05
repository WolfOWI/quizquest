// User Services

import { db } from '@/config/firebaseConfig';
import { User } from '@/lib/types/user/User';
import { setDoc, doc } from 'firebase/firestore';

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
