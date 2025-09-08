import { Timestamp } from 'firebase/firestore';

// Users/{uid}
export interface User {
  uid?: string;
  username: string;
  email: string;
  createdAt: Timestamp;

  // Currently Equipped
  selections: {
    characterId: string;
    petId: string;
  };

  economy: {
    gold: number;
    gems: number;
  };

  stats: {
    level: number;
    xp: number;

    // Runs
    totalRuns: number;
    totalWins: number;
    totalEnemiesDefeated: number;

    // Questions
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
  };
}
