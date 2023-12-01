import { FlashcardDto } from 'src/app/core/services/api-client/api-client';

export const flashcardStoreName = 'flashcardStore';

export type FlashcardState = {
  flashcards: { [id: string]: FlashcardDto };
};

export const initialFlashcardState: FlashcardState = {
  flashcards: {},
};
