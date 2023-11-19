import { createAction, props } from '@ngrx/store';
import {
  CollectionCardDto,
  CollectionDto,
  CreateCollectionDto,
  UpdateCollectionDto,
} from 'src/app/core/services/api-client/api-client';
import { AutocompleteOption } from 'src/app/shared/base-controls/autocomplete-input/autocomplete.models';

export enum CollectionActions {
  loadInitialCollectionCards = '[Collections] Load Initial Collection Cards',
  loadInitialCollectionCardsSuccess = '[Collections] Load Initial Collection Cards - Success',
  loadInitialCollectionCardsFailure = '[Collections] Load Initial Collection Cards - Failure',
  loadCollection = '[Collection] Load Collection',
  loadCollectionSuccess = '[Collection] Load Collection - Success',
  loadCollectionFailure = '[Collection] Load Collection - Failure',
  loadCurrentCollection = '[Collection] Load Current Collection',
  loadCurrentCollectionSuccess = '[Collection] Load Current Collection - Success',
  loadCurrentCollectionFailure = '[Collection] Load Current Collection - Failure',
  addNewCollection = '[Collection] Add New Collection',
  addNewCollectionSuccess = '[Collection] Add New Collection - Success',
  addNewCollectionFailure = '[Collection] Add New Collection - Failure',
  updateCollection = '[Collection] update Collection',
  updateCollectionSuccess = '[Collection] update Collection - Success',
  updateCollectionFailure = '[Collection] update Collection - Failure',
  deleteCollection = '[Collection] Delete Collection',
  deleteCollectionSuccess = '[Collection] Delete Collection - Success',
  deleteCollectionFailure = '[Collection] Delete Collection - Failure',
  loadCollectionAutocompleteOptions = '[Collection] Load Collection Autocomplete Options',
  loadCollectionAutocompleteOptionsSuccess = '[Collection] Load Collection Autocomplete Options - Success',
  loadCollectionAutocompleteOptionsFailure = '[Collection] Load Collection Autocomplete Options - Failure',
  addCollectionAutocompleteOption = '[Collection] Add Collection Autocomplete Option',
  updateCollectionAutocompleteOptions = '[Collection] Update Collection Autocomplete Options',
}

export const loadInitialCollectionCards = createAction(CollectionActions.loadInitialCollectionCards);
export const loadInitialCollectionCardsSuccess = createAction(
  CollectionActions.loadInitialCollectionCardsSuccess,
  props<{ cards: CollectionCardDto[] }>(),
);
export const loadInitialCollectionCardsFailure = createAction(
  CollectionActions.loadInitialCollectionCardsFailure,
  props<{ error: any }>(),
);

export const loadCollection = createAction(CollectionActions.loadCollection, props<{ id: string }>());
export const loadCollectionSuccess = createAction(
  CollectionActions.loadCollectionSuccess,
  props<{ collection: CollectionDto }>(),
);
export const loadCollectionFailure = createAction(CollectionActions.loadCollectionFailure, props<{ error: any }>());

export const loadCurrentCollection = createAction(CollectionActions.loadCurrentCollection, props<{ id: string }>());
export const loadCurrentCollectionSuccess = createAction(
  CollectionActions.loadCurrentCollectionSuccess,
  props<{ collection: CollectionDto }>(),
);
export const loadCurrentCollectionFailure = createAction(
  CollectionActions.loadCurrentCollectionFailure,
  props<{ error: any }>(),
);

export const addNewCollection = createAction(
  CollectionActions.addNewCollection,
  props<{ collection: CreateCollectionDto }>(),
);
export const addNewCollectionSuccess = createAction(
  CollectionActions.addNewCollectionSuccess,
  props<{ collection: CollectionDto }>(),
);
export const addNewCollectionFailure = createAction(CollectionActions.addNewCollectionFailure, props<{ error: any }>());

export const updateCollection = createAction(
  CollectionActions.updateCollection,
  props<{ collection: UpdateCollectionDto }>(),
);
export const updateCollectionSuccess = createAction(
  CollectionActions.updateCollectionSuccess,
  props<{ collection: CollectionDto }>(),
);
export const updateCollectionFailure = createAction(CollectionActions.updateCollectionFailure, props<{ error: any }>());

export const deleteCollection = createAction(CollectionActions.deleteCollection, props<{ id: string }>());
export const deleteCollectionSuccess = createAction(CollectionActions.deleteCollectionSuccess, props<{ id: string }>());
export const deleteCollectionFailure = createAction(CollectionActions.deleteCollectionFailure, props<{ error: any }>());

export const loadCollectionAutocompleteOptions = createAction(CollectionActions.loadCollectionAutocompleteOptions);
export const loadCollectionAutocompleteOptionsSuccess = createAction(
  CollectionActions.loadCollectionAutocompleteOptionsSuccess,
  props<{ options: AutocompleteOption[] }>(),
);
export const loadCollectionAutocompleteOptionsFailure = createAction(
  CollectionActions.loadCollectionAutocompleteOptionsFailure,
  props<{ error: any }>(),
);

export const addCollectionAutocompleteOption = createAction(
  CollectionActions.addCollectionAutocompleteOption,
  props<{ collection: CollectionDto }>(),
);

export const updateCollectionAutocompleteOptions = createAction(
  CollectionActions.updateCollectionAutocompleteOptions,
  props<{ collection: CollectionDto }>(),
);
