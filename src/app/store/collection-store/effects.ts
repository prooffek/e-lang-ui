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
import { switchMap, take, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AutocompleteOption } from 'src/app/shared/base-controls/autocomplete-input/autocomplete.models';

@Injectable({ providedIn: 'root' })
export class Effects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpClient = inject(CollectionClient);

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
