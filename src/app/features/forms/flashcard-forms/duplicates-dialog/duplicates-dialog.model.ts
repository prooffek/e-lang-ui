import { FlashcardDto } from '../../../../core/services/api-client/api-client';

export interface DuplicatedFlashcardData {
  flashcardBaseId: string;
  collectionName: string;
  meanings: string;
}

export interface DuplicatesDialogData {
  wordOrPhrase: string;
  duplicates: FlashcardDto[];
}
