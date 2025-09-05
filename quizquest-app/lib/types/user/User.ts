import { Timestamp } from 'firebase/firestore';

export interface User {
  uid?: string;
  username: string;
  email: string;
  createdAt: Timestamp;
  character?: string; // TODO: Add character type
  pet?: string; // TODO: Add pet type
  inventory?: string[]; // TODO: Add inventory type
  stats?: string[]; // TODO: Add stats type
}
