import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlashcardClient, FlashcardDto } from 'src/app/core/services/api-client/api-client';
import {
  addOrUpdateFlashcardFailure,
  addOrUpdateFlashcardSuccess,
  FlashcardActions,
  loadFlashcardsFailure,
  loadFlashcardsSuccess,
  removeFlashcardFailure,
  removeFlashcardSuccess,
  removeSelectedFlashcardsFailure,
  removeSelectedFlashcardsSuccess,
} from './actions';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { addFlashcardToCollection } from '../../collection-store/actions';

@Injectable({ providedIn: 'root' })
export class Effects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpClient = inject(FlashcardClient);
  private readonly _toastrService = inject(ToastrService);

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

  addFlashcardEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FlashcardActions.AddOrUpdateFlashcard),
      switchMap(({ flashcard }) => {
        return this._httpClient.addOrUpdateFlashcard(flashcard).pipe(
          mergeMap((flashcard: FlashcardDto) => [
            addOrUpdateFlashcardSuccess({ flashcard }),
            addFlashcardToCollection({ flashcard }),
          ]),
          catchError((error) => of(addOrUpdateFlashcardFailure({ error }))),
        );
      }),
    ),
  );

  addFlashcardSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FlashcardActions.AddOrUpdateFlashcardSuccess),
        tap(({ flashcard }) => {
          this._toastrService.success(`Flashcard '${flashcard.wordOrPhrase}' added successfully`);
        }),
      ),
    { dispatch: false },
  );

  removeFlashcardEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FlashcardActions.RemoveFlashcard),
      switchMap(({ flashcardId }) =>
        this._httpClient.deleteFlashcard(flashcardId).pipe(
          mergeMap(() => [removeFlashcardSuccess({ flashcardId })]),
          catchError(({ error }) => of(removeFlashcardFailure({ error }))),
        ),
      ),
    ),
  );

  removeFlashcardSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FlashcardActions.RemoveFlashcardSuccess),
        tap((_) => this._toastrService.success('Flashcard removed successfully.')),
      ),
    { dispatch: false },
  );

  removeSelectedFlashcardsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FlashcardActions.RemoveSelectedFlashcards),
      switchMap(({ flashcardIds }) =>
        this._httpClient.deleteFlashcards(flashcardIds).pipe(
          mergeMap(() => [removeSelectedFlashcardsSuccess({ flashcardIds })]),
          catchError(({ error }) => of(removeSelectedFlashcardsFailure({ error }))),
        ),
      ),
    ),
  );

  removeSelectedFlashcardSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FlashcardActions.RemoveSelectedFlashcardsSuccess),
        tap((_) => this._toastrService.success('Flashcards removed successfully.')),
      ),
    { dispatch: false },
  );
}
