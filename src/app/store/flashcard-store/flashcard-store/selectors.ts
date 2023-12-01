import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlashcardState, flashcardStoreName } from './state';
import { FlashcardDto, FlashcardStatus } from 'src/app/core/services/api-client/api-client';
import { FlashcardViewModel } from 'src/app/features/flashcards/flashcard-list/flashcard-view.model';

export const selectFlashcards = createFeatureSelector<FlashcardState>(flashcardStoreName);

export const selectAllFlashcards = createSelector(selectFlashcards, (state) => Object.values(state.flashcards));

export const selectAllFlashcardModels = createSelector(selectAllFlashcards, (flashcards) =>
  flashcards.map((flashcard: FlashcardDto) => {
    let counter = 1;

    const meanings = flashcard.meanings
      .map((meaning) => {
        return `${counter}. ${meaning.value}`;
        counter++;
      })
      .join('; ');

    return { ...flashcard, meanings, status: FlashcardStatus[flashcard.status] } as FlashcardViewModel;
  }),
);
