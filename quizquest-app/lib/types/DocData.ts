import { Timestamp } from 'firebase/firestore';

// docData/{docDataId}
export interface DocDataDoc {
  ownerUid: string;
  title: string;
  mime?: string; // e.g. "application/pdf"
  storagePath: string;
  pageCount?: number;
  createdAt: Timestamp;
  processedAt?: Timestamp;
}

// docData/{docDataId}/sections/{sectionId}
export interface DocSectionDoc {
  sectionId: string; // "s1","s2",...
  heading?: string; // H2/H3/slide title
  text: string;
  order: number; // 1..N
}
