import { getPowerAttackConfig } from '@/lib/content';

export interface PowerAttackTier {
  name: string;
  ms: number;
  hearts: number;
  combinedMs: number;
}

/**
 * Get all power attack tiers with combined timing for easier calculations
 */
export const getPowerAttackTiers = (): PowerAttackTier[] => {
  const config = getPowerAttackConfig();
  let combinedMs = 0;

  return [
    {
      name: 'pFive',
      ms: config.pFive.ms,
      hearts: config.pFive.hearts,
      combinedMs: (combinedMs += config.pFive.ms),
    },
    {
      name: 'pFour',
      ms: config.pFour.ms,
      hearts: config.pFour.hearts,
      combinedMs: (combinedMs += config.pFour.ms),
    },
    {
      name: 'pThree',
      ms: config.pThree.ms,
      hearts: config.pThree.hearts,
      combinedMs: (combinedMs += config.pThree.ms),
    },
    {
      name: 'pTwo',
      ms: config.pTwo.ms,
      hearts: config.pTwo.hearts,
      combinedMs: (combinedMs += config.pTwo.ms),
    },
    {
      name: 'pOne',
      ms: config.pOne.ms,
      hearts: config.pOne.hearts,
      combinedMs: (combinedMs += config.pOne.ms),
    },
  ];
};

/**
 * Calculate power attack damage based on elapsed time
 */
export const calculatePowerAttackDamage = (timeElapsedMs: number): number => {
  const tiers = getPowerAttackTiers();

  // Find the appropriate tier based on elapsed time
  for (const tier of tiers) {
    if (timeElapsedMs <= tier.combinedMs) {
      return tier.hearts;
    }
  }

  // If time exceeds all tiers, return 0 (missed attack)
  return 0;
};

/**
 * Calculate power attack damage based on progress value (0-1)
 */
export const calculatePowerAttackDamageFromProgress = (
  progressValue: number,
  totalDurationMs: number
): number => {
  const timeElapsed = (1 - progressValue) * totalDurationMs;
  return calculatePowerAttackDamage(timeElapsed);
};

/**
 * Get the total duration of the power attack in milliseconds
 */
export const getTotalPowerAttackDurationMs = (): number => {
  const tiers = getPowerAttackTiers();
  return tiers[tiers.length - 1].combinedMs;
};

/**
 * Get power attack tier information for a given elapsed time
 */
export const getPowerAttackTierForTime = (timeElapsedMs: number): PowerAttackTier | null => {
  const tiers = getPowerAttackTiers();

  for (const tier of tiers) {
    if (timeElapsedMs <= tier.combinedMs) {
      return tier;
    }
  }

  return null;
};
