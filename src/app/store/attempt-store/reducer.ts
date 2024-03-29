import { createReducer, on } from '@ngrx/store';
import { initialAttemptState } from './state';
import {
  addAttemptFailure,
  addAttemptSuccess,
  completeCurrentStage,
  deleteAttemptFailure,
  deleteAttemptSuccess,
  getAttemptByIdFailure,
  getAttemptByIdSuccess,
  getAttemptsForCollectionFailure,
  getAttemptsForCollectionSuccess,
  getNextExerciseFailure,
  getNextExerciseSuccess,
} from './actions';
import { AttemptDto, AttemptStageDto, AttemptStageType } from '../../core/services/api-client/api-client';

export const Reducer = createReducer(
  initialAttemptState,
  on(addAttemptSuccess, (state, { attempt }) => {
    const collectionAttempts = state.attempts[attempt.collectionId] ?? [];
    const attempts = { ...state.attempts, [attempt.collectionId]: [...collectionAttempts, attempt] };
    return { ...state, attempts };
  }),
  on(addAttemptFailure, (state, { error }) => ({ ...state, error })),
  on(getAttemptByIdSuccess, (state, { attempt }) => ({ ...state, currentAttempt: attempt })),
  on(getAttemptByIdFailure, (state, { error }) => ({ ...state, error })),
  on(getAttemptsForCollectionSuccess, (state, { collectionId, attempts }) => {
    const newAttempts = { ...state.attempts };
    newAttempts[collectionId] = attempts;

    return { ...state, attempts: newAttempts };
  }),
  on(getAttemptsForCollectionFailure, (state, { error }) => ({ ...state, error })),
  on(deleteAttemptSuccess, (state, { attempt }) => {
    let allAttempts = { ...state.attempts };
    allAttempts[attempt.collectionId] = [...state.attempts[attempt.collectionId].filter((x) => x.id !== attempt.id)];

    return { ...state, attempts: allAttempts };
  }),
  on(deleteAttemptFailure, (state, { error }) => ({ ...state, error })),
  on(getNextExerciseSuccess, (state, { exercise }) => ({
    ...state,
    currentExercise: exercise,
  })),
  on(getNextExerciseFailure, (state, { error }) => ({ ...state, error })),
  on(completeCurrentStage, (state) => {
    let currentStage = { ...state.currentAttempt!.currentStage } as AttemptStageDto;
    currentStage.stage = AttemptStageType.Complete;
    const attempt = { ...state.currentAttempt } as AttemptDto;
    attempt.completedFlashcardsCount += currentStage.flashcards?.length ?? 0;
    attempt.currentStage = currentStage;

    return {
      ...state,
      currentAttempt: attempt,
      currentExercise: undefined,
    };
  }),
);
