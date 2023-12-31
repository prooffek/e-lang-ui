import { createReducer, on } from '@ngrx/store';
import { initialCollectionState } from './state';
import {
  addCollectionAutocompleteOption,
  addFlashcardToCollection,
  addNewCollectionFailure,
  addNewCollectionSuccess,
  deleteCollectionFailure,
  deleteCollectionSuccess,
  deleteCurrentCollectionFlashcard,
  deleteCurrentCollectionFlashcards,
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
  updateCurrentCollectionFlashcard,
} from './actions';
import { CollectionCardDto, CollectionDto } from 'src/app/core/services/api-client/api-client';
import { deleteCollectionFromState, updateCollectionStateOnAddOrEdit } from './helper-functions';
import { AutocompleteOption } from 'src/app/shared/base-controls/autocomplete-input/autocomplete.models';

export const Reducer = createReducer(
  initialCollectionState,
  on(loadInitialCollectionCardsSuccess, (state, { cards }) => {
    const initCollectionCards: { [id: string]: CollectionCardDto } = {};
    cards.forEach((card) => (initCollectionCards[card.id] = card));

    return {
      ...state,
      initCollectionCards,
    };
  }),
  on(loadInitialCollectionCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadCollectionSuccess, (state, { collection }) => ({
    ...state,
    collections: { ...state.collections, [collection.id]: collection },
  })),
  on(loadCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadCurrentCollectionSuccess, (state, { collection }) => ({
    ...state,
    currentCollection: collection,
  })),
  on(loadCurrentCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(addNewCollectionSuccess, (state, { collection }) => updateCollectionStateOnAddOrEdit(state, collection)),
  on(addNewCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateCollectionSuccess, (state, { collection }) => updateCollectionStateOnAddOrEdit(state, collection)),
  on(updateCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteCollectionSuccess, (state, { id }) => deleteCollectionFromState(state, id)),
  on(deleteCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(addCollectionAutocompleteOption, (state, { collection }) => {
    const option: AutocompleteOption = { id: collection.id, name: collection.name };
    const collectionAutocompleteOptions = [...state.collectionAutocompleteOptions, option];

    return {
      ...state,
      collectionAutocompleteOptions,
    };
  }),
  on(loadCollectionAutocompleteOptionsSuccess, (state, { options }) => ({
    ...state,
    collectionAutocompleteOptions: options,
  })),
  on(loadCollectionAutocompleteOptionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateCollectionAutocompleteOptions, (state, { collection }) => {
    const newOption: AutocompleteOption = { id: collection.id, name: collection.name };
    const collectionAutocompleteOptions = [...state.collectionAutocompleteOptions];
    const oldOption = collectionAutocompleteOptions.find((option) => option.id === newOption.id);

    if (oldOption) {
      const index = collectionAutocompleteOptions.indexOf(oldOption);
      collectionAutocompleteOptions[index] = newOption;
    }

    return {
      ...state,
      collectionAutocompleteOptions,
    };
  }),
  on(addFlashcardToCollection, (state, { flashcard }) => {
    const currentCollection = { ...state.currentCollection } as CollectionDto;
    const subcollectionCards = currentCollection?.subcollections?.length ? [...currentCollection.subcollections] : [];

    currentCollection.subcollections = subcollectionCards?.map((card) => {
      if (card.title === flashcard.collectionName) {
        const temp = { ...card };
        temp.flashcardsCount += 1;
        return temp as CollectionCardDto;
      }

      return { ...card } as CollectionCardDto;
    });

    return { ...state, currentCollection: currentCollection };
  }),
  on(updateCurrentCollectionFlashcard, (state, { flashcard }) => {
    const flashcards = state.currentCollection?.flashcards ? [...state.currentCollection.flashcards] : undefined;

    if (!flashcards) return { ...state };

    const index = flashcards.findIndex((f) => f.id === flashcard.id);

    if (index >= 0) {
      flashcards[index] = flashcard;
    }

    const currentCollection = { ...state.currentCollection, flashcards } as CollectionDto;

    return { ...state, currentCollection };
  }),
  on(deleteCurrentCollectionFlashcard, (state, { flashcardId }) => {
    const flashcards = state.currentCollection?.flashcards ? [...state.currentCollection.flashcards] : undefined;

    if (!flashcards) return { ...state };

    const currentCollection = {
      ...state.currentCollection,
      flashcards: flashcards.filter((f) => f.id !== flashcardId),
    } as CollectionDto;

    return { ...state, currentCollection };
  }),
  on(deleteCurrentCollectionFlashcards, (state, { flashcardIds }) => {
    const flashcards = state.currentCollection?.flashcards ? [...state.currentCollection.flashcards] : undefined;

    if (!flashcards) return { ...state };

    const currentCollection = {
      ...state.currentCollection,
      flashcards: flashcards.filter((f) => !flashcardIds.includes(f.id)),
    } as CollectionDto;

    return { ...state, currentCollection };
  }),
);
