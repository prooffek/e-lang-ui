import { AutocompleteOption } from 'src/app/shared/base-controls/autocomplete-input/autocomplete.models';
import { CollectionCardDto, CollectionDto } from '../../core/services/api-client/api-client';

export const collectionStoreName = 'collectionStore';

export type CollectionState = {
  collections: { [id: string]: CollectionDto };
  currentCollection: CollectionDto | undefined;
  initCollectionCards: { [id: string]: CollectionCardDto };
  collectionAutocompleteOptions: AutocompleteOption[];
};

export const initialCollectionState: CollectionState = {
  collections: {},
  currentCollection: undefined,
  initCollectionCards: {},
  collectionAutocompleteOptions: [],
};
