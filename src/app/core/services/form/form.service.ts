import { inject, Injectable, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CollectionFormControlNames,
  DefaultCollectionFormValues,
  DefaultFlashcardFormValues,
  FlashcardFormControlNames,
  ValidationValues,
} from '../../enums/form-constants';
import { CollectionOdataService } from '../odata/collection-odata.service';
import { AsyncValidatorsCreator } from '../../validators/async/async-validators.creator';
import { AutocompleteOption } from '../../../shared/base-controls/autocomplete-input/autocomplete.models';
import { MeaningDto } from '../api-client/api-client';
import { meaningsValidator } from '../../validators/sync/meaning.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly _fb = inject(FormBuilder);
  private readonly _collectionOdataService = inject(CollectionOdataService);
  private readonly _asyncValidatorsBuilder = inject(AsyncValidatorsCreator);

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

  getFlashcardAddFormGroup(options: Signal<AutocompleteOption[]>) {
    return this._fb.group({
      [FlashcardFormControlNames.wordOrPhrase]: [
        DefaultFlashcardFormValues.collectionId,
        [
          Validators.required,
          Validators.minLength(ValidationValues.wordOrPhraseMinLength),
          Validators.maxLength(ValidationValues.wordOrPhraseMaxLength),
        ],
      ],
      [FlashcardFormControlNames.flashcardBaseId]: [DefaultFlashcardFormValues.flashcardBaseId],
      [FlashcardFormControlNames.collectionId]: [
        DefaultFlashcardFormValues.collectionId,
        [Validators.required],
        [this._asyncValidatorsBuilder.createRecordExistsValidator(this._collectionOdataService, true, options)],
      ],
      [FlashcardFormControlNames.meanings]: this._fb.array(
        [this.getMeaningFormGroup()],
        [Validators.required, meaningsValidator()],
      ),
    });
  }

  getMeaningFormGroup(meaning?: MeaningDto) {
    const validators = [
      Validators.required,
      Validators.minLength(ValidationValues.meaningMinLength),
      Validators.maxLength(ValidationValues.meaningMaxLength),
    ];

    return this._fb.group({
      [FlashcardFormControlNames.meaningId]: [meaning?.id ?? DefaultFlashcardFormValues.meaningId],
      [FlashcardFormControlNames.meaningValue]: [meaning?.value ?? DefaultFlashcardFormValues.meaningValue, validators],
    });
  }

  setMeanings(meanings: MeaningDto[], form: FormGroup) {
    const formGroups = meanings.map((m) => this.getMeaningFormGroup(m));
    form.setControl(FlashcardFormControlNames.meanings, this._fb.array(formGroups, [Validators.required]));
    form.get(FlashcardFormControlNames.meanings)?.markAllAsTouched();
  }
}
