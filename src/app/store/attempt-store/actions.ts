import { createAction, props } from '@ngrx/store';
import { AddAttemptDto, AttemptDto } from '../../core/services/api-client/api-client';

export enum AttemptActions {
  addAttempt = '[Attempt] Add Attempt',
  addAttemptSuccess = '[Attempt] Add Attempt - Success',
  addAttemptFailure = '[Attempt] Add Attempt - Failure',
  getAttemptsForCollection = '[Attempt] Get attempts for collection',
  getAttemptsForCollectionSuccess = '[Attempt] Get attempts for collection - Success',
  getAttemptsForCollectionFailure = '[Attempt] Get attempts for collection - Failure',
}

export const addAttempt = createAction(AttemptActions.addAttempt, props<{ addAttempt: AddAttemptDto }>());
export const addAttemptSuccess = createAction(AttemptActions.addAttemptSuccess, props<{ attempt: AttemptDto }>());
export const addAttemptFailure = createAction(AttemptActions.addAttemptFailure, props<{ error: any }>());

export const getAttemptsForCollection = createAction(
  AttemptActions.getAttemptsForCollection,
  props<{ collectionId: string }>(),
);
export const getAttemptsForCollectionSuccess = createAction(
  AttemptActions.getAttemptsForCollectionSuccess,
  props<{ collectionId: string; attempts: AttemptDto[] }>(),
);
export const getAttemptsForCollectionFailure = createAction(
  AttemptActions.getAttemptsForCollectionFailure,
  props<{ error: any }>(),
);
