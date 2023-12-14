import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState, collectionStoreName } from './state';
import { FlashcardDto, FlashcardStatus } from '../../core/services/api-client/api-client';
import { getMeaningsString } from '../../core/helpers/store/flashcardHelper';
import { FlashcardViewModel } from '../../features/flashcards/flashcard-view/flashcard-view.model';

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

export const selectCurrentCollectionFlashcardModels = createSelector(
  selectCollections,
  (state) =>
    state.currentCollection?.flashcards?.map((flashcard: FlashcardDto) => {
      const meanings = getMeaningsString(flashcard.meanings);
      return { ...flashcard, meanings, status: FlashcardStatus[flashcard.status] } as FlashcardViewModel;
    }),
);
