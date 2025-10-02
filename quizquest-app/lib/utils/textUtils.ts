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

// Pad a number with leading zeros (e.g. 1 -> 01)
export const addLeadingZero = (number: number) => {
  return number.toString().padStart(2, '0');
};

// Capitalise the first letter of a string and remove underscores / hyphens
export const capitaliseWordAndRemoveUnderscores = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ').replace(/-/g, ' ');
};

// Slugify a string (e.g. "Hello World" -> "hello-world")
export const slugify = (string: string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};
