import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttemptState, attemptStoreName } from './state';
import { AttemptDto } from '../../core/services/api-client/api-client';
import { getMeaningsString } from '../../core/helpers/store/flashcardHelper';

export const selectAttemptState = createFeatureSelector<AttemptState>(attemptStoreName);

export const selectAttemptsByCollectionId = (collectionId: string) =>
  createSelector(selectAttemptState, (state) => state.attempts[collectionId]);

export const selectAttemptById = (attemptId: string) =>
  createSelector(selectAttemptState, (state) =>
    Object.values(state.attempts)
      .flat()
      .find((x) => x.id === attemptId),
  );

export const selectCurrentAttempt = createSelector(selectAttemptState, (state) => state.currentAttempt);

export const selectCurrentExercise = createSelector(selectAttemptState, (state) => state.currentExercise);

export const selectMeaningsByFlashcardStateId = (flashcardStateId: string) => {
  return createSelector(selectCurrentAttempt, (attempt?: AttemptDto) => {
    const meanings =
      attempt?.currentStage.flashcards?.find((x) => x.id === flashcardStateId)?.flashcard?.meanings ?? [];

    return getMeaningsString(meanings);
  });
};
