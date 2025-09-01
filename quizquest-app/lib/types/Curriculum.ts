// Curriculum Types
import { Timestamp } from 'firebase/firestore';
import { Domain } from './Domain';

export type AudienceLevel = 'kids' | 'general' | 'expert';
export type SourceType = 'generated' | 'document';

// subjects/{id}
export interface SubjectDoc {
  /** doc id :
   *  generated => "gen:<domain>:<subjectSlug>:<level>"
   *  document  => "doc:<docDataId>:<level>"
   */
  subjectTitle: string;
  subjectSlug: string;
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
  pageSize: number; // e.g. 10 | 12 per page
  createdAt: Timestamp;
}

// subjects/{id}/subtopics/{id}/pages/{id}
export interface QuestionPageDoc {
  /** doc id: "1", "2", ... (string) */
  pageNumber: number;
  items: QuestionItem[];
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
