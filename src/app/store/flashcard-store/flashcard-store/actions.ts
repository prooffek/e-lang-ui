import { createAction, props } from '@ngrx/store';
import { FlashcardDto } from 'src/app/core/services/api-client/api-client';

export enum FlashcardActions {
  loadFlashcards = '[Flashcard] Load flashcards',
  loadFlashcardsSuccess = '[Flashcard] Load flashcards - Success',
  loadFlashcardsFailure = '[Flashcard] Load flashcards - Failure',
}

export const loadFlashcards = createAction(FlashcardActions.loadFlashcards);
export const loadFlashcardsSuccess = createAction(
  FlashcardActions.loadFlashcardsSuccess,
  props<{ flashcards: FlashcardDto[] }>(),
);
export const loadFlashcardsFailure = createAction(FlashcardActions.loadFlashcardsFailure, props<{ error: any }>());
