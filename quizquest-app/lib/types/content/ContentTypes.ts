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
}

export interface Domain {
  id: string;
  title: string;
  slug: string;
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
  player: {
    baseHealth: number;
  };
  enemy: {
    baseHealth: number;
  };
  powerAttack: {
    pFive: PowerAttack;
    pFour: PowerAttack;
    pThree: PowerAttack;
    pTwo: PowerAttack;
    pOne: PowerAttack;
  };
  pricing: {
    story: Record<
      AudienceLevel,
      {
        gold: number;
        gems: number;
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
