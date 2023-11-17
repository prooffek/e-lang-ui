import {
  CollectionCardDto,
  CollectionClient,
  CollectionDto,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../../core/services/api-client/api-client';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { CollectionState, initialCollectionState } from './state';
import { Observable } from 'rxjs';
import { FormStore } from '../form-store/store';

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

@Injectable({ providedIn: 'root' })
export class CollectionStore extends ComponentStore<CollectionState> {
  private readonly _collectionClient = inject(CollectionClient);
  private readonly _formStore = inject(FormStore);

  constructor() {
    super(initialCollectionState);
  }

  // Selectors
  getCollection(id: string | undefined | null): Signal<CollectionDto | undefined> {
    if (!id) return signal(undefined);

    return this.selectSignal((state) => {
      return state.collections[id];
    });
  }

  getInitCollectionCards(): Signal<CollectionCardDto[]> {
    return this.selectSignal((state) => Object.values(state.initCollectionCards));
  }

  getCurrentCollection = this.selectSignal((state) => {
    return state.currentCollection;
  });

  // Updaters
  updateCurrentCollection = this.updater((state: CollectionState, collection: CollectionDto) => ({
    ...state,
    currentCollection: collection,
  }));

  updateCollection = this.updater((state: CollectionState, collection: CollectionDto) => ({
    ...state,
    collections: { ...state.collections, [collection.id]: collection },
  }));

  updateState = this.updater((state: CollectionState, collection: CollectionDto) => {
    const { initCollectionCards, currentCollection, collectionCard, prevParentId } = this.getCurrentStateConstituents(
      state,
      collection,
    );

    const hasParentChanged = collection.parentId !== prevParentId;

    if (initCollectionCards[collection.id] || !collection.parentId) {
      initCollectionCards[collection.id] = collectionCard;
    }

    if (hasParentChanged) {
      this.updateInitCollectionCards(initCollectionCards, collection, prevParentId);
      this.updateCurrentCollectionState(currentCollection, collection, prevParentId, collectionCard);
    }

    return {
      ...state,
      collections: { ...state.collections, [collection.id]: collection },
      initCollectionCards,
      currentCollection,
    } as CollectionState;
  });

  removeCollection = this.updater((state: CollectionState, collectionId: string) => {
    const parentId = state.collections[collectionId]?.parentId;

    const collections = state.collections;
    delete collections[collectionId];

    const initCards = state.initCollectionCards;
    delete initCards[collectionId];

    if (parentId && initCards[parentId]?.subcollectionsCount) {
      initCards[parentId].subcollectionsCount -= 1;
    }

    const subcollections = state.currentCollection?.subcollections?.filter((c) => c.id !== collectionId);

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
  });

  // Effects
  loadInitCollectionCards = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() => {
        return this._collectionClient.getCollectionCards(null).pipe(
          map((cards) => {
            const cardsObj: { [id: string]: CollectionCardDto } = {};
            cards.forEach((card) => (cardsObj[card.id] = card));
            return cardsObj;
          }),
          tapResponse({
            next: (cards) => this.patchState({ initCollectionCards: cards }),
            error: (error) => console.error(error),
          }),
        );
      }),
    );
  });

  loadCollection = this.effect((collectionId$: Observable<string>) => {
    return collectionId$.pipe(
      switchMap((collectionId: string) => {
        return this._collectionClient.getCollection(collectionId).pipe(
          tapResponse({
            next: (collection) => this.updateCollection(collection),
            error: (error) => console.error(error),
          }),
        );
      }),
    );
  });

  loadCurrentCollection = this.effect((collectionId$: Observable<string>) => {
    return collectionId$.pipe(
      switchMap((collectionId: string) => {
        return this._collectionClient.getCollection(collectionId).pipe(
          tapResponse({
            next: (collection) => {
              this.updateCurrentCollection(collection);
              this.updateCollection(collection);
            },
            error: (error) => console.error(error),
          }),
        );
      }),
    );
  });

  addNewCollection = this.effect((collection$: Observable<CreateCollectionDto>) =>
    collection$.pipe(
      switchMap((collectionDto: CreateCollectionDto) =>
        this._collectionClient.addCollection(collectionDto).pipe(
          tapResponse({
            next: (collection: CollectionDto) => {
              this.updateState(collection);
              this._formStore.addCollectionAutocompleteOption({ id: collection.id, name: collection.name });
            },
            error: (error) => console.error(error),
          }),
        ),
      ),
    ),
  );

  editCollection = this.effect((collection$: Observable<UpdateCollectionDto>) =>
    collection$.pipe(
      switchMap((collectionDto: UpdateCollectionDto) =>
        this._collectionClient.updateCollection(collectionDto).pipe(
          tapResponse({
            next: (collection: CollectionDto) => {
              this.updateState(collection);
            },
            error: (error) => console.error(error),
          }),
        ),
      ),
    ),
  );

  deleteCollection = this.effect((collectionId$: Observable<string>) =>
    collectionId$.pipe(
      switchMap((id: string) =>
        this._collectionClient.deleteCollection(id).pipe(
          tapResponse({
            next: () => this.removeCollection(id),
            error: (error) => console.error(error),
          }),
        ),
      ),
    ),
  );

  private getCurrentStateConstituents(state: CollectionState, collection: CollectionDto): CollectionStateConstituents {
    const initCollectionCards = state.initCollectionCards;
    const currentCollection = {
      ...state.currentCollection,
      subcollections: state.currentCollection?.subcollections ?? [],
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
  }

  private updateInitCollectionCards(
    initCollectionCards: { [id: string]: CollectionCardDto },
    collection: CollectionDto,
    prevParentId: string | undefined,
  ) {
    if (initCollectionCards[collection.id] && collection.parentId) {
      delete initCollectionCards[collection.id];
    }

    if (collection.parentId && initCollectionCards[collection.parentId]) {
      initCollectionCards[collection.parentId].subcollectionsCount += 1;
    }

    if (prevParentId && initCollectionCards[prevParentId]?.subcollectionsCount) {
      initCollectionCards[prevParentId].subcollectionsCount -= 1;
    }
  }

  private updateCurrentCollectionState(
    currentCollection: CurrentCollection,
    collection: CollectionDto,
    prevParentId: string | undefined,
    collectionCard: CollectionCardDto,
  ) {
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
      if (index && index >= 0) {
        currentCollection.subcollections[index] = collectionCard;
      }
    }

    const includingCurrentSubcollection = currentCollection.subcollections.find((c) => c.id === collection.parentId);
    const prevIncludingCurrentSubcollection = currentCollection.subcollections.find((c) => c.id === prevParentId);

    if (includingCurrentSubcollection) {
      includingCurrentSubcollection.subcollectionsCount += 1;
    }

    if (prevIncludingCurrentSubcollection?.subcollectionsCount) {
      prevIncludingCurrentSubcollection.subcollectionsCount -= 1;
    }
  }
}
