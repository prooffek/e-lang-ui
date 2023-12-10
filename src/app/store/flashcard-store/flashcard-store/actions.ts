import { createAction, props } from '@ngrx/store';
import { AddOrUpdateFlashcardDto, FlashcardDto } from 'src/app/core/services/api-client/api-client';

export enum FlashcardActions {
  loadFlashcards = '[Flashcard] Load flashcards',
  loadFlashcardsSuccess = '[Flashcard] Load flashcards - Success',
  loadFlashcardsFailure = '[Flashcard] Load flashcards - Failure',
  addFlashcard = '[Flashcard] Add flashcard',
  addFlashcardSuccess = '[Flashcard] Add flashcard - Success',
  addFlashcardFailure = '[Flashcard] Add flashcard - Failure',
}

export const loadFlashcards = createAction(FlashcardActions.loadFlashcards);
export const loadFlashcardsSuccess = createAction(
  FlashcardActions.loadFlashcardsSuccess,
  props<{ flashcards: FlashcardDto[] }>(),
);
export const loadFlashcardsFailure = createAction(FlashcardActions.loadFlashcardsFailure, props<{ error: any }>());

export const addFlashcard = createAction(
  FlashcardActions.addFlashcard,
  props<{ flashcard: AddOrUpdateFlashcardDto }>(),
);

export const addFlashcardSuccess = createAction(
  FlashcardActions.addFlashcardSuccess,
  props<{ flashcard: FlashcardDto }>(),
);

export const addFlashcardFailure = createAction(FlashcardActions.addFlashcardFailure, props<{ error: any }>());
