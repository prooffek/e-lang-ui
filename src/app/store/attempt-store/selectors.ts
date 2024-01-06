import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttemptState, attemptStoreName } from './state';

export const selectAttemptState = createFeatureSelector<AttemptState>(attemptStoreName);

export const selectAttemptsByCollectionId = (collectionId: string) =>
  createSelector(selectAttemptState, (state) => state.attempts[collectionId]);

export const selectAttemptById = (attemptId: string) =>
  createSelector(selectAttemptState, (state) =>
    Object.values(state.attempts)
      .flat()
      .find((x) => x.id === attemptId),
  );
