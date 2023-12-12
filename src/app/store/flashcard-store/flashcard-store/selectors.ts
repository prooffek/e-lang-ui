import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlashcardState, flashcardStoreName } from './state';
import { FlashcardDto, FlashcardStatus, MeaningDto } from 'src/app/core/services/api-client/api-client';
import { FlashcardViewModel } from 'src/app/features/flashcards/flashcard-view/flashcard-view.model';

export const selectFlashcards = createFeatureSelector<FlashcardState>(flashcardStoreName);

export const selectAllFlashcards = createSelector(selectFlashcards, (state) => Object.values(state.flashcards));

export const selectAllFlashcardModels = createSelector(selectAllFlashcards, (flashcards) =>
  flashcards.map((flashcard: FlashcardDto) => {
    const meanings = getMeaningsString(flashcard.meanings);
    return { ...flashcard, meanings, status: FlashcardStatus[flashcard.status] } as FlashcardViewModel;
  }),
);

export const selectFlashcard = (id: string) =>
  createSelector(selectFlashcards, (state) => {
    return state.flashcards[id];
  });

const getMeaningsString = (meanings: MeaningDto[]) => {
  return meanings
    .map((meaning, index) => {
      return `${index + 1}. ${meaning.value}`;
    })
    .join('; ');
};
