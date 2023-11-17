import { AutocompleteOption } from '../../shared/base-controls/autocomplete-input/autocomplete.models';

export type FormState = {
  collectionAutocompleteData: AutocompleteOption[];
};

export const initialFormState: FormState = {
  collectionAutocompleteData: [],
};
