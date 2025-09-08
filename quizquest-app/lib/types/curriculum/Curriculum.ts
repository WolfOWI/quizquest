// Curriculum Types
import { Timestamp } from 'firebase/firestore';
import { Domain } from './Domain';

export type AudienceLevel = 'novice' | 'apprentice' | 'master';
export type SourceType = 'generated' | 'document';

// subjects/{id}
export interface SubjectDoc {
  /** doc id :
   *  generated => "gen:<domain>:<subjectSlug>:<level>"
   *  document  => "doc:<docDataId>:<level>"
   */
  subjectTitle: string;
  subjectSlug: string;
  description?: string;
  level: AudienceLevel;
  createdAt: Timestamp;
  source: SourceType;

  // Only for generated subjects
  domain?: Domain;

  // Only for uploaded document subjects
  ownerUid?: string;
  docDataId?: string; // points to the stored doc data /docData/<docDataId>
}

// subjects/{id}/subtopics/{id}
export interface SubtopicDoc {
  /** doc id: subtopicSlug */
  subtopicTitle: string;
  subtopicSlug: string;
  description?: string;
  createdAt: Timestamp;
}

// subjects/{id}/subtopics/{id}/pages/{id}
export interface QuestionPageDoc {
  /** doc id: "1", "2", ... (string) */
  pageNumber: number;
  items: QuestionItem[]; // Always contains 10 items
  createdAt: Timestamp;
}

export type QuestionKind = 'single_select' | 'multi_select' | 'true_false';

export type QuestionItem =
  | {
      kind: 'single_select';
      question: string;
      choices: string[];
      answer: number;
      hint: string;
      explanation: string;
    }
  | {
      kind: 'multi_select';
      question: string;
      choices: string[];
      answers: number[];
      hint: string;
      explanation: string;
    }
  | {
      kind: 'true_false';
      question: string;
      answerBool: boolean;
      hint: string;
      explanation: string;
    };
