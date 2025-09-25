import { Timestamp } from 'firebase/firestore';
import { AudienceLevel } from '../general/General';

// Users/{uid}
export interface User {
  uid: string;
  username: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  equipped: {
    characterId: string; // Catalog key
    petId?: string; // Catalog key (optional)
    petNickname?: string;
  };
  economy: {
    gold: number;
    gems: number;
  };
  xpTotal: number;
}

// users/{uid}/unlocks/{unlockId}
export interface UserUnlock {
  unlockId?: string; // TODO: Catalog key composite (e.g. character_blue_mage)
  type: 'character' | 'pet';
  targetId: string; // TODO: Reference catalog key
  source: 'shop' | 'quest';
  paid?: {
    price?: number;
    currency?: 'gold' | 'gems';
  };
  acquiredAt: Timestamp;
}

// users/{uid}/inventory/{itemId}
export interface UserInventory {
  itemId?: string; // TODO: Reference catalog key
  qty: number;
  updatedAt: Timestamp;
}

// users/{uid}/ownedStories/{storyId}
export interface UserOwnedStory {
  storyId?: string; // TODO: Foreign key to stories/{storyId}
  acquiredAt: Timestamp;
  lastPlayedAt?: Timestamp;
  domainId: string; // Denormalised from subjects
  subjectId: string; // Foreign key to subjects/{subjectId}
  subjectTitle: string; // Denormalised from subjects
  level: AudienceLevel; // Denormalised from subjects
}

// users/{uid}/storyProgress/{storyId}
export interface UserStoryProgress {
  storyId?: string; // TODO: Foreign key to stories/{storyId}
  runs: {
    total: number;
    won: number;
  };
  battles: {
    total: number;
    won: number;
  };
  questions: {
    total: number; // TODO: Denormalised - sum of all stories' questionCount
    correct: number;
  };
}

// users/{uid}/chapterProgress/{chapterId}
export interface UserChapterProgress {
  chapterId?: string; // TODO: Foreign key to chapters/{chapterId}
  runs: {
    total: number;
    won: number;
  };
  battles: {
    total: number;
    won: number;
  };
  questions: {
    total: number; // TODO: Denormalised - from chapter's questionCount
    correct: number;
  };
}

// users/{uid}/questRuns/{rudId}
export interface UserQuestRun {
  runId?: string;
  storyId: string; // Foreign key to stories/{storyId}
  chapterId: string; // Foreign key to chapters/{chapterId}
  startedAt: Timestamp;
  finishedAt: Timestamp;
  durationSec: number;
  didWin: boolean;
  battles: {
    total: number;
    won: number;
  };
  damage: {
    dealtHearts: number;
    takenHearts: number;
  };
  questions: {
    total: number;
    correct: number;
  };
  attacks: {
    powerFive: number; // Legendary Hits
    powerFour: number; // Strong Hits
    powerThree: number; // Good Hits
    powerTwo: number; // Awkward Hits
    powerOne: number; // Weak Hits
    powerZero: number; // Missed Hits
  };
  xpGained: number;
  goldGained: number;
  balanceVersion: string; // TODO: Catalog key from content/balance
}

// users/{uid}/stats/global
export interface UserGlobalStats {
  docId?: 'global';
  runs: {
    total: number;
    won: number;
    playTimeSec: number;
  };
  battles: {
    total: number;
    won: number;
  };
  damage: {
    dealtHearts: number;
    takenHearts: number;
  };
  attacks: {
    powerFive: number;
    powerFour: number;
    powerThree: number;
    powerTwo: number;
    powerOne: number;
    powerZero: number;
  };
  questions: {
    total: number;
    correct: number;
  };
}

// users/{uid}/slayStats/{enemyId}
export interface UserSlayStat {
  enemyId?: string; // TODO: Catalog key to content/enemies
  battles: {
    total: number;
    won: number;
  };
  lastSeenAt: Timestamp;
}
