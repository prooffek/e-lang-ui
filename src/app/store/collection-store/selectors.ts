import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState, collectionStoreName } from './state';

export const selectCollections = createFeatureSelector<CollectionState>(collectionStoreName);

export const selectInitCollectionCards = createSelector(selectCollections, (state) =>
  Object.values(state.initCollectionCards),
);

export const selectCollection = (id: string | undefined | null) =>
  createSelector(selectCollections, (state) => {
    if (!id) return undefined;
    return state.collections[id];
  });

export const selectCurrentCollection = createSelector(selectCollections, (state) => state.currentCollection);

export const selectCollectionAutocompleteOptions = createSelector(
  selectCollections,
  (state) => state.collectionAutocompleteOptions,
);
