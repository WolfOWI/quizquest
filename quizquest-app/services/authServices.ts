// Authentication Services

import { auth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { LoginFormData } from '@/lib/types/auth/LoginFormData';
import { SignUpFormData } from '@/lib/types/auth/SignUpFormData';
import { createUserInDb, getUserFromDb } from './userServices';
import { User } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';
import { getProfileDefaults } from '@/lib/content';

// User Registration (Firebase Auth + Firestore)
export const registerUser = async (data: SignUpFormData) => {
  try {
    const firebaseUser = await signUp(data);

    const pDefault = getProfileDefaults();

    // Default values for newly created user
    const userForDb: User = {
      uid: firebaseUser.uid,
      username: data.username,
      email: data.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      equipped: {
        characterId: pDefault.equipped.characterId,
        petId: pDefault.equipped.petId,
      },
      economy: {
        gold: pDefault.economy.gold,
        gems: pDefault.economy.gems,
      },
      xpTotal: pDefault.xpTotal,
    };

    await createUserInDb(userForDb);

    console.log('User registered and database record created successfully!');
    return firebaseUser;
  } catch (error) {
    console.error('Error registering user:', error);
    // TODO: Add logic to delete the authentication user if the database record creation fails
    throw error;
  }
};

// Firebase User Sign Up
const signUp = async (data: SignUpFormData) => {
  const { email, password } = data;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    throw error;
  }
};

// User Login (Firebase Auth + Firestore)
export const loginUser = async (data: LoginFormData): Promise<User> => {
  try {
    const firebaseUser = await login(data);

    const userFromDb = await getUserFromDb(firebaseUser.uid);

    if (!userFromDb) {
      throw new Error('User not found in database');
    }

    return userFromDb;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Firebase User Login
const login = async (data: LoginFormData) => {
  const { email, password } = data;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorCode = (error as FirebaseError).code;
    const errorMessage = (error as FirebaseError).message;
    console.error(errorCode, errorMessage);
    throw error;
  }
};

// User Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};
