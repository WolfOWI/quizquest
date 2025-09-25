import type { ContentPack } from '@/lib/types/content/ContentTypes';

export const loadContentPack = (): ContentPack => {
  const enemies = require('@/assets/content/enemies.json');
  const items = require('@/assets/content/items.json');
  const characters = require('@/assets/content/characters.json');
  const pets = require('@/assets/content/pets.json');
  const environments = require('@/assets/content/environments.json');
  const domains = require('@/assets/content/domains.json');
  const balance = require('@/assets/content/balance.json');

  return {
    enemies,
    items,
    characters,
    pets,
    environments,
    domains,
    balance,
  };
};
