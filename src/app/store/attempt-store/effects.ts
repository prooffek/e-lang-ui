import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttemptClient, AttemptDto } from '../../core/services/api-client/api-client';
import { ToastrService } from 'ngx-toastr';
import {
  addAttemptFailure,
  addAttemptSuccess,
  AttemptActions,
  deleteAttemptFailure,
  deleteAttemptSuccess,
  getAttemptsForCollectionFailure,
  getAttemptsForCollectionSuccess,
} from './actions';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AttemptOdataService } from '../../core/services/odata/attempt-odata.service';

@Injectable({ providedIn: 'root' })
export class Effects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpClient = inject(AttemptClient);
  private readonly _toastrService = inject(ToastrService);
  private readonly _odataService = inject(AttemptOdataService);

  addAttemptEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AttemptActions.addAttempt),
      switchMap(({ addAttempt }) =>
        this._httpClient.addAttempt(addAttempt).pipe(
          mergeMap((attempt: AttemptDto) => [addAttemptSuccess({ attempt })]),
          catchError((error) => of(addAttemptFailure({ error }))),
        ),
      ),
    ),
  );

  addAttemptSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AttemptActions.addAttemptSuccess),
        tap(({ attempt }) => {
          this._toastrService.success(`Attempt '${attempt.name}' created successfully.`);
        }),
      ),
    { dispatch: false },
  );

  getAttemptsForCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AttemptActions.getAttemptsForCollection),
      switchMap(({ collectionId }) =>
        this._odataService.getAttemptsByCollectionId(collectionId).pipe(
          mergeMap((attempts: AttemptDto[]) => [getAttemptsForCollectionSuccess({ collectionId, attempts })]),
          catchError((error) => of(getAttemptsForCollectionFailure({ error }))),
        ),
      ),
    ),
  );

  deleteAttemptEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AttemptActions.deleteAttempt),
      switchMap(({ attempt }) =>
        this._httpClient.deleteAttempt(attempt.id).pipe(
          mergeMap(() => [deleteAttemptSuccess({ attempt })]),
          catchError((error) => of(deleteAttemptFailure({ error }))),
        ),
      ),
    ),
  );

  deleteAttemptSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AttemptActions.deleteAttemptSuccess),
        tap(({ attempt }) => {
          console.log(attempt.name);
          this._toastrService.success(`Attempt '${attempt.name}' removed successfully.`);
        }),
      ),
    { dispatch: false },
  );
}
