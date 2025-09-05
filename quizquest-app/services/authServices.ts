// Authentication Services

import { auth } from '@/config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { LoginFormData } from '@/lib/types/auth/LoginFormData';
import { SignUpFormData } from '@/lib/types/auth/SignUpFormData';
import { createUserInDb } from './userServices';
import { User } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';

export const registerUser = async (data: SignUpFormData) => {
  try {
    const firebaseUser = await signUp(data);

    const userForDb: User = {
      uid: firebaseUser.uid,
      username: data.username,
      email: data.email,
      createdAt: Timestamp.now(),
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
export const signUp = async (data: SignUpFormData) => {
  const { email, password } = data;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginFormData) => {
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
