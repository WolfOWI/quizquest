import { getEnemy, getBalance } from '@/lib/content';
import { Chapter, Story } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';
import { AudienceLevel } from '@/lib/types/general/General';
import { shuffleArray } from '@/lib/utils/arrayUtils';

export interface HealthState {
  playerHealth: number;
  enemyHealth: number;
  currentEnemyId: string;
  storyLevel: AudienceLevel;
  enemyLineup: string[];
}

/**
 * Initialise health state based on story level and default enemy
 */
export const getInitialHealthState = (
  chapterAndProgress: Chapter & UserChapterProgress,
  story: Story
): HealthState => {
  const gameBalance = getBalance();
  const scaledPlayerHealth =
    gameBalance.questRunConfig.levels[story.level || 'novice'].playerBaseHealth;

  // Create shuffled enemy lineup
  const allEnemyIds = ['bushMonster_default', 'goblin_default', 'skeleton_default'];
  const enemyLineup = shuffleArray([...allEnemyIds]);

  // Get the first enemy from the shuffled lineup
  const firstEnemyId = enemyLineup[0];
  const firstEnemy = getEnemy(firstEnemyId);

  return {
    playerHealth: scaledPlayerHealth,
    enemyHealth: firstEnemy?.hp || 30,
    currentEnemyId: firstEnemyId,
    storyLevel: story.level || 'novice',
    enemyLineup,
  };
};

/**
 * Apply damage to enemy
 */
export const damageEnemy = (currentHealth: number, damage: number): number => {
  return Math.max(0, currentHealth - damage);
};

/**
 * Apply damage to player
 */
export const damagePlayer = (currentHealth: number, damage: number): number => {
  return Math.max(0, currentHealth - damage);
};

/**
 * Spawn a new enemy when current enemy is defeated
 */
export const spawnNewEnemy = (
  enemyLineup: string[]
): { newEnemyId: string; newEnemyHealth: number } => {
  // Randomly select a new enemy
  const randomIndex = Math.floor(Math.random() * enemyLineup.length);
  const newEnemyId = enemyLineup[randomIndex];

  // Get enemy data and reset health
  const newEnemy = getEnemy(newEnemyId);
  if (newEnemy) {
    return {
      newEnemyId,
      newEnemyHealth: newEnemy.hp,
    };
  } else {
    // Fallback to default enemy
    return {
      newEnemyId: 'bushMonster_default',
      newEnemyHealth: 30,
    };
  }
};

/**
 * Check if player is defeated (health <= 0)
 */
export const isPlayerDefeated = (playerHealth: number): boolean => {
  return playerHealth <= 0;
};

/**
 * Check if enemy is defeated (health <= 0)
 */
export const isEnemyDefeated = (enemyHealth: number): boolean => {
  return enemyHealth <= 0;
};

/**
 * Get power attack damage based on timing and question difficulty
 */
export const getPowerAttackDmg = (questionStartTime?: number, questionEndTime?: number): number => {
  // TODO: Implement power attack timing

  return 100;
};

/**
 * Get enemy attack damage - always 1 for now
 */
export const getEnemyAttackDmg = (enemyId: string): number => {
  return 1;
};
