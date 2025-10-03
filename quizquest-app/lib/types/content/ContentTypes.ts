import { AudienceLevel } from '../general/General';

export interface Enemy {
  id: string;
  name: string;
  spriteKey: string;
  iconKey: string;
  hp: number;
  drops: {
    gold: number;
    xp: number;
  };
}

// Positive effects (mainly from items)
export type EffectBuff = 'heal' | 'hint';

export interface Item {
  id: string;
  name: string;
  iconKey: string;
  description: string;
  goldPrice?: number;
  gemPrice?: number;
  effect: {
    type: EffectBuff;
    amount?: number;
  };
}

export interface Character {
  id: string;
  name: string;
  spriteKey: string;
  iconKey: string;
  goldPrice?: number;
  gemPrice?: number;
}

export interface Pet {
  id: string;
  name: string;
  spriteKey: string;
  iconKey: string;
  goldPrice?: number;
  gemPrice?: number;
}

export interface Environment {
  id: string;
  name: string;
  imgKey: string;
  iconKey: string;
  textureKey: string;
}

export interface Domain {
  id: string;
  title: string;
  iconKey: string;
  hexColour: string;
  chapterTemplates: {
    novice: string[];
    apprentice: string[];
    master: string[];
  };
}

export interface PowerAttack {
  sec: number;
  hearts: number;
}

export interface Balance {
  questRunConfig: {
    levels: Record<
      AudienceLevel,
      {
        playerBaseHealth: number;
      }
    >;
    powerAttack: {
      pFive: PowerAttack;
      pFour: PowerAttack;
      pThree: PowerAttack;
      pTwo: PowerAttack;
      pOne: PowerAttack;
    };
  };
  pricing: {
    generate: {
      gold?: number;
      gems?: number;
    };
    story: Record<
      AudienceLevel,
      {
        gold?: number;
        gems?: number;
      }
    >;
  };
  profileDefaults: {
    equipped: {
      characterId: string;
      petId?: string;
    };
    economy: {
      gold: number;
      gems: number;
    };
    xpTotal: number;
  };
  curriculumGenConfig: {
    levels: Record<
      AudienceLevel,
      {
        difficultyDescription: string;
        educationLevel: string;
        quizChunksPerChapter: {
          min: number;
          max: number;
        };
        questionsPerQuizChunk: number;
        questionTypeDistributionPercent: {
          singleSelect: number;
          multiSelect: number;
          trueFalse: number;
        };
        questionDifficulty: {
          negationsRate: number;
          distractorSimilarity: number;
        };
        bloomWeights: {
          remember: number;
          understand: number;
          apply: number;
          analyze: number;
        };
        hints: {
          style: 'explicit' | 'subtle' | 'cryptic';
        };
        explanations: {
          depth: 'brief' | 'standard' | 'rich';
        };
      }
    >;
    configExplain: {
      'questionDifficulty.negationsRate': string;
      'questionDifficulty.distractorSimilarity': string;
      'hints.style': string;
      'explanations.depth': string;
      bloomWeights: string;
    };
  };
}

export interface ContentPack {
  enemies: Record<string, Enemy>;
  items: Record<string, Item>;
  characters: Record<string, Character>;
  pets: Record<string, Pet>;
  environments: Record<string, Environment>;
  domains: Record<string, Domain>;
  balance: Balance;
}
