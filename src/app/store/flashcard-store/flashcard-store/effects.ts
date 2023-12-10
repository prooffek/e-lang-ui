import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlashcardClient, FlashcardDto } from 'src/app/core/services/api-client/api-client';
import {
  addFlashcardFailure,
  addFlashcardSuccess,
  FlashcardActions,
  loadFlashcardsFailure,
  loadFlashcardsSuccess,
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
      ofType(FlashcardActions.addFlashcard),
      switchMap(({ flashcard }) => {
        return this._httpClient.addOrUpdateFlashcard(flashcard).pipe(
          mergeMap((flashcard: FlashcardDto) => [
            addFlashcardSuccess({ flashcard }),
            addFlashcardToCollection({ flashcard }),
          ]),
          catchError((error) => of(addFlashcardFailure({ error }))),
        );
      }),
    ),
  );

  addFlashcardSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FlashcardActions.addFlashcardSuccess),
        tap(({ flashcard }) => {
          this._toastrService.success(`Flashcard '${flashcard.wordOrPhrase}' added successfully`);
        }),
      ),
    { dispatch: false },
  );
}
