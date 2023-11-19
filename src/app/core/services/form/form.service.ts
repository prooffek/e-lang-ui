import { inject, Injectable, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CollectionFormControlNames, DefaultCollectionFormValues, ValidationValues } from '../../enums/form-constants';
import { CollectionOdataService } from '../odata/collection-odata.service';
import { AsyncValidatorsBuilder } from '../../validators/async/async-validators.builder';
import { AutocompleteOption } from '../../../shared/base-controls/autocomplete-input/autocomplete.models';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly _fb = inject(FormBuilder);
  private readonly _collectionOdataService = inject(CollectionOdataService);
  private readonly _asyncValidatorsBuilder = inject(AsyncValidatorsBuilder);

  getCollectionAddFormGroup(options: Signal<AutocompleteOption[]>) {
    return this._fb.group({
      [CollectionFormControlNames.name]: [
        DefaultCollectionFormValues.name,
        [
          Validators.required,
          Validators.minLength(ValidationValues.collectionNameMinLength),
          Validators.maxLength(ValidationValues.collectionNameMaxLength),
        ],
        [this._asyncValidatorsBuilder.createValueInUseValidator(this._collectionOdataService, 'title')],
      ],
      [CollectionFormControlNames.parentCollectionId]: [
        DefaultCollectionFormValues.parentCollectionId,
        [],
        [this._asyncValidatorsBuilder.createRecordExistsValidator(this._collectionOdataService, true, options)],
      ],
    });
  }

  getCollectionEditFormGroup(options: Signal<AutocompleteOption[]>, collectionId: string) {
    return this._fb.group({
      [CollectionFormControlNames.id]: [DefaultCollectionFormValues.id],
      [CollectionFormControlNames.name]: [
        DefaultCollectionFormValues.name,
        [
          Validators.required,
          Validators.minLength(ValidationValues.collectionNameMinLength),
          Validators.maxLength(ValidationValues.collectionNameMaxLength),
        ],
        [this._asyncValidatorsBuilder.createValueInUseValidator(this._collectionOdataService, 'title', collectionId)],
      ],
      [CollectionFormControlNames.parentCollectionId]: [
        DefaultCollectionFormValues.parentCollectionId,
        [],
        [this._asyncValidatorsBuilder.createRecordExistsValidator(this._collectionOdataService, true, options)],
      ],
    });
  }

  filterOptions(value: string | undefined | null, options: AutocompleteOption[]) {
    if (!value) {
      return options;
    }

    value = value.toLowerCase();
    const option = options?.find((o) => o.id === value);

    return options?.filter((o) => o.name.toLowerCase().includes(value!) || (option && o.name.includes(option?.name)));
  }
}
