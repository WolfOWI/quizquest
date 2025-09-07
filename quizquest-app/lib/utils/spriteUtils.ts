// General Sprite Utilities

/**
 * Calculate the width of a sprite with a desired height and a frame size (in ratio)
 * @param desiredHeight - The height you want the sprite to be
 * @param frameSize - The original frame dimensions {width, height}
 * @returns The calculated width that maintains the original aspect ratio
 */
export const calculateProportionalWidth = (
  desiredHeight: number,
  frameSize: { width: number; height: number }
) => {
  // console.log('The frame size is', frameSize);
  // console.log('This is the wanted height', wantedHeight);
  // console.log('This would make the width', wantedHeight * (frameSize.width / frameSize.height));
  return desiredHeight * (frameSize.width / frameSize.height);
};
