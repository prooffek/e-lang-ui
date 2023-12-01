import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlashcardClient, FlashcardDto } from 'src/app/core/services/api-client/api-client';
import { FlashcardActions, loadFlashcardsFailure, loadFlashcardsSuccess } from './actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Effects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpClient = inject(FlashcardClient);

  loadFlashcardsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FlashcardActions.loadFlashcards),
      switchMap(() =>
        this._httpClient.getAll().pipe(
          mergeMap((flashcards: FlashcardDto[]) => [loadFlashcardsSuccess({ flashcards })]),
          catchError((error) => of(loadFlashcardsFailure({ error }))),
        ),
      ),
    ),
  );
}
