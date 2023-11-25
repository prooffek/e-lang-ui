import { CollectionCardDto, CollectionDto } from '../../core/services/api-client/api-client';
import { CollectionState } from './state';

export interface CurrentCollection {
  subcollections: CollectionCardDto[];
  id?: string | undefined;
  name?: string | undefined;
  parentId?: string | undefined;
  parentName?: string | undefined;
}

export interface CollectionStateConstituents {
  collectionCard: CollectionCardDto;
  currentCollection: CurrentCollection;
  initCollectionCards: { [id: string]: CollectionCardDto };
  prevParentId: string | undefined;
}

export const updateCollectionStateOnAddOrEdit = (state: CollectionState, collection: CollectionDto) => {
  const { initCollectionCards, currentCollection, collectionCard, prevParentId } = getCurrentStateConstituents(
    state,
    collection,
  );

  if (initCollectionCards[collection.id] || !collection.parentId) {
    initCollectionCards[collection.id] = collectionCard;
  }

  updateInitCollectionCards(initCollectionCards, collection, prevParentId);
  updateCurrentCollectionState(currentCollection, collection, prevParentId, collectionCard);

  return {
    ...state,
    collections: { ...state.collections, [collection.id]: collection },
    initCollectionCards,
    currentCollection,
  } as CollectionState;
};

export const deleteCollectionFromState = (state: CollectionState, id: string) => {
  const parentId = state.collections[id]?.parentId;

  const collections = { ...state.collections };
  delete collections[id];

  const initCards = { ...state.initCollectionCards };
  delete initCards[id];

  if (parentId && initCards[parentId]?.subcollectionsCount) {
    const parentCollection = { ...initCards[parentId] };
    parentCollection.subcollectionsCount -= 1;
    initCards[parentId] = parentCollection as CollectionCardDto;
  }

  const subcollections = state.currentCollection?.subcollections?.filter((c) => c.id !== id);

  const subcollection = subcollections?.find((c) => c.id === parentId);
  if (subcollection?.subcollectionsCount) {
    subcollection.subcollectionsCount -= 1;
  }

  return {
    ...state,
    collections: collections,
    initCollectionCards: initCards,
    currentCollection: {
      ...state.currentCollection,
      subcollections: subcollections,
    },
  } as CollectionState;
};

const getCurrentStateConstituents = (
  state: CollectionState,
  collection: CollectionDto,
): CollectionStateConstituents => {
  const initCollectionCards = { ...state.initCollectionCards };
  const currentCollection = {
    ...state.currentCollection,
    subcollections: state.currentCollection?.subcollections?.length ? [...state.currentCollection.subcollections] : [],
  };
  const collectionCard = {
    id: collection.id,
    title: collection.name,
    subcollectionsCount: collection.subcollections?.length ?? 0,
    flashcardsCount: 0,
  } as CollectionCardDto;
  const prevParentId = state.collections[collection.id]?.parentId;

  return {
    initCollectionCards,
    currentCollection,
    collectionCard,
    prevParentId,
  };
};

const updateInitCollectionCards = (
  initCollectionCards: { [id: string]: CollectionCardDto },
  collection: CollectionDto,
  prevParentId: string | undefined,
) => {
  if (initCollectionCards[collection.id] && collection.parentId) {
    delete initCollectionCards[collection.id];
  }

  if (collection.parentId && initCollectionCards[collection.parentId]) {
    const parentCollection = { ...initCollectionCards[collection.parentId] };
    parentCollection.subcollectionsCount += 1;
    initCollectionCards[collection.parentId] = parentCollection as CollectionCardDto;
  }

  if (prevParentId && initCollectionCards[prevParentId]?.subcollectionsCount) {
    const parentCollection = { ...initCollectionCards[prevParentId] };
    parentCollection.subcollectionsCount -= 1;
    initCollectionCards[prevParentId] = parentCollection as CollectionCardDto;
  }
};

const updateCurrentCollectionState = (
  currentCollection: CurrentCollection,
  collection: CollectionDto,
  prevParentId: string | undefined,
  collectionCard: CollectionCardDto,
) => {
  const isSubcollectionOfCurrentCollection = currentCollection.id === collection.parentId;
  const wasSubcollectionOfCurrentCollection = currentCollection.id === prevParentId;

  if (isSubcollectionOfCurrentCollection && !wasSubcollectionOfCurrentCollection) {
    currentCollection.subcollections.push(collectionCard);
  }

  if (wasSubcollectionOfCurrentCollection && !isSubcollectionOfCurrentCollection) {
    currentCollection.subcollections = currentCollection.subcollections.filter((c) => c.id !== collection.id);
  }

  if (isSubcollectionOfCurrentCollection && wasSubcollectionOfCurrentCollection) {
    const subcollection = currentCollection.subcollections.find((c) => c.id === collection.id);
    const index = subcollection && currentCollection.subcollections.indexOf(subcollection);
    if (index !== undefined && index >= 0) {
      currentCollection.subcollections[index] = collectionCard;
    }
  }

  const includingCurrentSubcollection = currentCollection.subcollections.find((c) => c.id === collection.parentId);
  const prevIncludingCurrentSubcollection = currentCollection.subcollections.find((c) => c.id === prevParentId);

  if (includingCurrentSubcollection) {
    const collection = { ...includingCurrentSubcollection };
    collection.subcollectionsCount += 1;
    const index = currentCollection.subcollections.indexOf(includingCurrentSubcollection);
    currentCollection.subcollections[index] = collection as CollectionCardDto;
  }

  if (prevIncludingCurrentSubcollection?.subcollectionsCount) {
    const collection = { ...prevIncludingCurrentSubcollection };
    collection.subcollectionsCount -= 1;
    const index = currentCollection.subcollections.indexOf(prevIncludingCurrentSubcollection);
    currentCollection.subcollections[index] = collection as CollectionCardDto;
  }
};
