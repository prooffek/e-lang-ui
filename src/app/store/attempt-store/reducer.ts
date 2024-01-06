import { createReducer, on } from '@ngrx/store';
import { initialAttemptState } from './state';
import {
  addAttemptFailure,
  addAttemptSuccess,
  getAttemptsForCollectionFailure,
  getAttemptsForCollectionSuccess,
} from './actions';

export const Reducer = createReducer(
  initialAttemptState,
  on(addAttemptSuccess, (state, { attempt }) => {
    const collectionAttempts = state.attempts[attempt.collectionId] ?? [];
    const attempts = { ...state.attempts, [attempt.collectionId]: [...collectionAttempts, attempt] };
    return { ...state, attempts };
  }),
  on(addAttemptFailure, (state, { error }) => ({ ...state, error })),
  on(getAttemptsForCollectionSuccess, (state, { collectionId, attempts }) => {
    const newAttempts = { ...state.attempts };
    newAttempts[collectionId] = attempts;

    return { ...state, attempts: newAttempts };
  }),
  on(getAttemptsForCollectionFailure, (state, { error }) => ({ ...state, error })),
);
