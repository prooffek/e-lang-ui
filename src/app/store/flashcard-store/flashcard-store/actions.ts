import { createAction, props } from '@ngrx/store';
import { AddOrUpdateFlashcardDto, FlashcardDto } from 'src/app/core/services/api-client/api-client';

export enum FlashcardActions {
  loadFlashcards = '[Flashcard] Load flashcards',
  loadFlashcardsSuccess = '[Flashcard] Load flashcards - Success',
  loadFlashcardsFailure = '[Flashcard] Load flashcards - Failure',
  AddOrUpdateFlashcard = '[Flashcard] Add or update flashcard',
  AddOrUpdateFlashcardSuccess = '[Flashcard] Add or update flashcard - Success',
  AddOrUpdateFlashcardFailure = '[Flashcard] Add or update flashcard - Failure',
  RemoveFlashcard = '[Flashcard] Remove flashcard',
  RemoveFlashcardSuccess = '[Flashcard] Remove flashcard - Success',
  RemoveFlashcardFailure = '[Flashcard] Remove flashcard - Failure',
  RemoveSelectedFlashcards = '[Flashcard] Remove selected flashcards',
  RemoveSelectedFlashcardsSuccess = '[Flashcard] Remove selected flashcards - Success',
  RemoveSelectedFlashcardsFailure = '[Flashcard] Remove selected flashcards - Failure',
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

export const removeFlashcard = createAction(FlashcardActions.RemoveFlashcard, props<{ flashcardId: string }>());
export const removeFlashcardSuccess = createAction(
  FlashcardActions.RemoveFlashcardSuccess,
  props<{ flashcardId: string }>(),
);
export const removeFlashcardFailure = createAction(FlashcardActions.RemoveFlashcardFailure, props<{ error: any }>());

export const removeSelectedFlashcards = createAction(
  FlashcardActions.RemoveSelectedFlashcards,
  props<{ flashcardIds: string[] }>(),
);

export const removeSelectedFlashcardsSuccess = createAction(
  FlashcardActions.RemoveSelectedFlashcardsSuccess,
  props<{ flashcardIds: string[] }>(),
);

export const removeSelectedFlashcardsFailure = createAction(
  FlashcardActions.RemoveSelectedFlashcardsFailure,
  props<{ error: any }>(),
);
