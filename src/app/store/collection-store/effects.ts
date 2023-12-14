import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionCardDto, CollectionClient, CollectionDto } from 'src/app/core/services/api-client/api-client';
import {
  addCollectionAutocompleteOption,
  addNewCollectionFailure,
  addNewCollectionSuccess,
  CollectionActions,
  deleteCollectionFailure,
  deleteCollectionSuccess,
  loadCollectionAutocompleteOptionsFailure,
  loadCollectionAutocompleteOptionsSuccess,
  loadCollectionFailure,
  loadCollectionSuccess,
  loadCurrentCollectionFailure,
  loadCurrentCollectionSuccess,
  loadInitialCollectionCardsFailure,
  loadInitialCollectionCardsSuccess,
  updateCollectionAutocompleteOptions,
  updateCollectionFailure,
  updateCollectionSuccess,
} from './actions';
import { switchMap, take, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AutocompleteOption } from 'src/app/shared/base-controls/autocomplete-input/autocomplete.models';
import { ToastrService } from 'ngx-toastr';
import { loadFlashcardsSuccess } from '../flashcard-store/flashcard-store/actions';

@Injectable({ providedIn: 'root' })
export class Effects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpClient = inject(CollectionClient);
  private readonly _toastrService = inject(ToastrService);

  loadInitialCollectionCardsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.loadInitialCollectionCards),
      switchMap(() =>
        this._httpClient.getCollectionCards(null).pipe(
          mergeMap((cards: CollectionCardDto[]) => [loadInitialCollectionCardsSuccess({ cards })]),
          catchError((error) => of(loadInitialCollectionCardsFailure({ error }))),
        ),
      ),
    ),
  );

  loadCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.loadCollection),
      switchMap(({ id }) =>
        this._httpClient.getCollection(id).pipe(
          mergeMap((collection: CollectionDto) => [loadCollectionSuccess({ collection })]),
          catchError((error) => of(loadCollectionFailure({ error }))),
        ),
      ),
    ),
  );

  loadCurrentCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.loadCurrentCollection),
      switchMap(({ id }) =>
        this._httpClient.getCollection(id).pipe(
          mergeMap((collection: CollectionDto) => [
            loadCurrentCollectionSuccess({ collection }),
            loadCollectionSuccess({ collection }),
            loadFlashcardsSuccess({ flashcards: collection.flashcards ?? [] }),
          ]),
          catchError((error) => of(loadCurrentCollectionFailure({ error }))),
        ),
      ),
    ),
  );

  addNewCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.addNewCollection),
      switchMap(({ collection }) =>
        this._httpClient.addCollection(collection).pipe(
          mergeMap((collection: CollectionDto) => [
            addNewCollectionSuccess({ collection }),
            addCollectionAutocompleteOption({ collection }),
          ]),
          catchError((error) => of(addNewCollectionFailure({ error }))),
        ),
      ),
    ),
  );

  addNewCollectionSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(CollectionActions.addNewCollectionSuccess),
        tap(({ collection }) => {
          this._toastrService.success(`Collection '${collection.name}' added successfully`);
        }),
      ),
    { dispatch: false },
  );

  editCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.updateCollection),
      switchMap(({ collection }) => {
        return this._httpClient.updateCollection(collection).pipe(
          mergeMap((collection: CollectionDto) => [
            updateCollectionSuccess({ collection }),
            updateCollectionAutocompleteOptions({ collection }),
          ]),
          catchError((error) => of(updateCollectionFailure({ error }))),
        );
      }),
    ),
  );

  editCollectionSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(CollectionActions.updateCollectionSuccess),
        tap(({ collection }) => {
          this._toastrService.success(`Collection '${collection.name}' updated successfully`);
        }),
      ),
    { dispatch: false },
  );

  deleteCollectionEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.deleteCollection),
      switchMap(({ id }) =>
        this._httpClient.deleteCollection(id).pipe(
          mergeMap(() => [deleteCollectionSuccess({ id })]),
          catchError((error) => of(deleteCollectionFailure({ error }))),
        ),
      ),
    ),
  );

  deleteCollectionSuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(CollectionActions.deleteCollectionSuccess),
        tap((_) => {
          this._toastrService.success(`Collection removed successfully`);
        }),
      ),
    { dispatch: false },
  );

  loadCollectionAutocompleteOptionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CollectionActions.loadCollectionAutocompleteOptions),
      take(1),
      switchMap(() =>
        this._httpClient.getCollectionAutocompleteData().pipe(
          mergeMap((options: AutocompleteOption[]) => [loadCollectionAutocompleteOptionsSuccess({ options })]),
          catchError((error) => of(loadCollectionAutocompleteOptionsFailure({ error }))),
        ),
      ),
    ),
  );
}
