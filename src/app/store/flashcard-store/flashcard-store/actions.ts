import { createAction, props } from '@ngrx/store';
import { AddOrUpdateFlashcardDto, FlashcardDto } from 'src/app/core/services/api-client/api-client';

export enum FlashcardActions {
  loadFlashcards = '[Flashcard] Load flashcards',
  loadFlashcardsSuccess = '[Flashcard] Load flashcards - Success',
  loadFlashcardsFailure = '[Flashcard] Load flashcards - Failure',
  AddOrUpdateFlashcard = '[Flashcard] Add or update flashcard',
  AddOrUpdateFlashcardSuccess = '[Flashcard] Add or update flashcard - Success',
  AddOrUpdateFlashcardFailure = '[Flashcard] Add or update flashcard - Failure',
}

export const loadFlashcards = createAction(FlashcardActions.loadFlashcards);
export const loadFlashcardsSuccess = createAction(
  FlashcardActions.loadFlashcardsSuccess,
  props<{ flashcards: FlashcardDto[] }>(),
);
export const loadFlashcardsFailure = createAction(FlashcardActions.loadFlashcardsFailure, props<{ error: any }>());

export const addOrUpdateFlashcard = createAction(
  FlashcardActions.AddOrUpdateFlashcard,
  props<{ flashcard: AddOrUpdateFlashcardDto }>(),
);

export const addOrUpdateFlashcardSuccess = createAction(
  FlashcardActions.AddOrUpdateFlashcardSuccess,
  props<{ flashcard: FlashcardDto }>(),
);

export const addOrUpdateFlashcardFailure = createAction(
  FlashcardActions.AddOrUpdateFlashcardFailure,
  props<{ error: any }>(),
);
