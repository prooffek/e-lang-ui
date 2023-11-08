import { CollectionCardDto, CollectionClient, CollectionDto } from '../../core/services/api-client/api-client';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CollectionState, initialCollectionState } from './state';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollectionStore extends ComponentStore<CollectionState> {
  private readonly _collectionClient = inject(CollectionClient);

  constructor() {
    super(initialCollectionState);
  }

  // Selectors

  getCollection(id: string | undefined | null): Signal<CollectionDto | undefined> {
    if (!id) return signal(undefined);

    return this.selectSignal((state) => state.collections[id]);
  }

  getInitCollectionCards(): Signal<CollectionCardDto[]> {
    return this.selectSignal((state) => state.initCollectionCards);
  }

  getCurrentCollection = this.selectSignal((state) => {
    return state.currentCollection;
  });

  // Updaters
  addOrUpdateCollection = this.updater((state: CollectionState, collection: CollectionDto) => ({
    ...state,
    collections: { ...state.collections, [collection.id]: collection },
  }));

  updateCurrentCollection = this.updater((state) => ({
    ...state,
    parentCollectionCards: state.currentCollection?.subcollections,
  }));

  // Effects
  loadInitCollectionCards = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() => {
        return this._collectionClient.getCollectionCards(null).pipe(
          tapResponse({
            next: (cards) => this.patchState({ initCollectionCards: cards }),
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
            next: (collection) => this.patchState({ currentCollection: collection }),
            error: (error) => console.error(error),
          }),
        );
      }),
    );
  });
}
