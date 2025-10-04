import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

/**
 * Converts a Firebase Timestamp to a readable date string
 * Handles both Firebase Timestamp objects and serialized timestamps
 * @param timestamp - Firebase Timestamp object, Date object, or serialized timestamp
 * @param formatString - date-fns format string (default: 'MMM yyyy' for "Jan 2024")
 * @returns Formatted date string
 */
export const formatFirebaseTimestamp = (
  timestamp: Timestamp | Date | { seconds: number; nanoseconds?: number } | string | number,
  formatString: string = 'MMM yyyy'
): string => {
  let date: Date;

  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
    // Firebase Timestamp object
    date = timestamp.toDate();
  } else if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
    // Serialized Firebase Timestamp
    date = new Date(timestamp.seconds * 1000);
  } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    // String or number timestamp
    date = new Date(timestamp);
  } else {
    // Fallback to current date if invalid
    console.warn('Invalid timestamp provided to formatFirebaseTimestamp:', timestamp);
    date = new Date();
  }

  return format(date, formatString);
};

/**
 * Common date format presets
 */
export const DATE_FORMATS = {
  MONTH_YEAR: 'MMM yyyy', // Jan 2024
  FULL_DATE: 'MMM dd, yyyy', // Jan 15, 2024
  SHORT_DATE: 'MM/dd/yyyy', // 01/15/2024
  LONG_DATE: 'MMMM dd, yyyy', // January 15, 2024
  TIME_ONLY: 'h:mm a', // 2:30 PM
  DATETIME: 'MMM dd, yyyy h:mm a', // Jan 15, 2024 2:30 PM
} as const;
