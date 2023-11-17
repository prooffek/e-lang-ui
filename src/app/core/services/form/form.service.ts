import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CollectionFormControlNames, DefaultCollectionFormValues, ValidationValues } from '../../enums/form-constants';
import { CollectionOdataService } from '../odata/collection-odata.service';
import { AsyncValidatorsBuilder } from '../../validators/async/async-validators.builder';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly _fb = inject(FormBuilder);
  private readonly _collectionOdataService = inject(CollectionOdataService);
  private readonly _asyncValidatorsBuilder = inject(AsyncValidatorsBuilder);

  getCollectionFormGroup() {
    return this._fb.group({
      [CollectionFormControlNames.id]: [DefaultCollectionFormValues.id],
      [CollectionFormControlNames.name]: [
        DefaultCollectionFormValues.name,
        [
          Validators.required,
          Validators.minLength(ValidationValues.collectionNameMinLength),
          Validators.maxLength(ValidationValues.collectionNameMaxLength),
        ],
      ],
      [CollectionFormControlNames.parentCollectionId]: [
        DefaultCollectionFormValues.parentCollectionId,
        [],
        [this._asyncValidatorsBuilder.createRecordExistsValidator(this._collectionOdataService, true)],
      ],
    });
  }

  registerValueInUsOnCollectionControl(
    control: FormControl | undefined,
    attribute: string,
    collectionId?: string | undefined,
  ) {
    control?.addAsyncValidators(
      this._asyncValidatorsBuilder.createValueInUseValidator(this._collectionOdataService, attribute, collectionId),
    );
  }
}
