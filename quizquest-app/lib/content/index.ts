import {
  Enemy,
  Item,
  Character,
  Pet,
  Environment,
  Domain,
  Balance,
} from '@/lib/types/content/ContentTypes';
import { loadContentPack } from './loader';
import { getIcon, getBackground, getTexture } from './registry';

export const CONTENT = loadContentPack();

// Simple Getters
export const getEnemy = (id: string): Enemy => {
  return CONTENT.enemies[id];
};
export const getItem = (id: string): Item => {
  return CONTENT.items[id];
};
export const getCharacter = (id: string): Character => {
  return CONTENT.characters[id];
};
export const getPet = (id: string): Pet => {
  return CONTENT.pets[id];
};
export const getEnvironment = (id: string): Environment => {
  return CONTENT.environments[id];
};

// Environment utility functions
export const getEnvironmentIcon = (environmentId: string) => {
  const environment = getEnvironment(environmentId);
  if (!environment) return null;
  return getIcon(environment.iconKey);
};

export const getEnvironmentBackground = (environmentId: string) => {
  const environment = getEnvironment(environmentId);
  if (!environment) return null;
  return getBackground(environment.imgKey);
};

// Texture utility function
export const getTextureResource = (textureKey: string) => {
  return getTexture(textureKey);
};

// Domain utility function
export const getDomain = (id: string): Domain => {
  return CONTENT.domains[id];
};

// Balances
export const getBalance = (): Balance => {
  return CONTENT.balance;
};

export const getProfileDefaults = () => {
  return CONTENT.balance.profileDefaults;
};

export const getContentRegistry = () => {
  return CONTENT;
};

// Content grouping utilities
export const getCharacterVariants = (baseType: string): Character[] => {
  return Object.values(CONTENT.characters).filter((character) => character.id.startsWith(baseType));
};

export const getEnemyVariants = (baseType: string): Enemy[] => {
  return Object.values(CONTENT.enemies).filter((enemy) => enemy.id.startsWith(baseType));
};

export const getCharacterGroups = () => {
  const groups: Record<string, Character[]> = {};

  Object.values(CONTENT.characters).forEach((character) => {
    const baseType = character.id.split('_')[0]; // e.g., "heavyKnight" from "heavyKnight_red"
    if (!groups[baseType]) {
      groups[baseType] = [];
    }
    groups[baseType].push(character);
  });

  return groups;
};

export const getEnemyGroups = () => {
  const groups: Record<string, Enemy[]> = {};

  Object.values(CONTENT.enemies).forEach((enemy) => {
    const baseType = enemy.id.split('_')[0]; // e.g., "bushMonster" from "bushMonster_default"
    if (!groups[baseType]) {
      groups[baseType] = [];
    }
    groups[baseType].push(enemy);
  });

  return groups;
};
