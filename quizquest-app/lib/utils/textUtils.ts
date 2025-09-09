// Capitalise the first letter of a string
export const capitaliseWord = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Capitalise the first letter of each word in a string
export const capitaliseAllWords = (string: string) => {
  return string
    .split(' ')
    .map((word) => capitaliseWord(word))
    .join(' ');
};
