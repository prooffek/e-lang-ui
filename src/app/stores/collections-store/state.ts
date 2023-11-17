import { CollectionCardDto, CollectionDto } from '../../core/services/api-client/api-client';

export type CollectionState = {
  collections: { [id: string]: CollectionDto };
  currentCollection: CollectionDto | undefined;
  initCollectionCards: { [id: string]: CollectionCardDto };
};

export const initialCollectionState: CollectionState = {
  collections: {},
  currentCollection: undefined,
  initCollectionCards: {},
};
