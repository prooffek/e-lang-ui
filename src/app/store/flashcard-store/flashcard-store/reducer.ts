import { createReducer, on } from '@ngrx/store';
import { initialFlashcardState } from './state';
import {
  addOrUpdateFlashcardSuccess,
  loadFlashcardsFailure,
  loadFlashcardsSuccess,
  removeFlashcardFailure,
  removeFlashcardSuccess,
  removeSelectedFlashcardsFailure,
  removeSelectedFlashcardsSuccess,
} from './actions';
import { FlashcardDto } from 'src/app/core/services/api-client/api-client';

export const Reducer = createReducer(
  initialFlashcardState,
  on(loadFlashcardsSuccess, (state, { flashcards }) => {
    const collection: { [id: string]: FlashcardDto } = {};
    flashcards.forEach((flashcard) => (collection[flashcard.id] = flashcard));

    return {
      ...state,
      flashcards: collection,
    };
  }),
  on(loadFlashcardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(addOrUpdateFlashcardSuccess, (state, { flashcard }) => {
    const flashcards = { ...state.flashcards };
    flashcards[flashcard.id] = flashcard;
    return { ...state, flashcards };
  }),
  on(removeFlashcardSuccess, (state, { flashcardId }) => {
    const flashcards = { ...state.flashcards };
    delete flashcards[flashcardId];

    return { ...state, flashcards };
  }),
  on(removeFlashcardFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(removeSelectedFlashcardsSuccess, (state, { flashcardIds }) => {
    const flashcards = { ...state.flashcards };

    flashcardIds.forEach((id) => delete flashcards[id]);

    return { ...state, flashcards };
  }),
  on(removeSelectedFlashcardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
