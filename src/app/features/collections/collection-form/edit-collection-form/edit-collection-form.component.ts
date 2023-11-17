import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CollectionDto } from '../../../../core/services/api-client/api-client';
import { FormControl } from '@angular/forms';
import { AutocompleteOption } from '../../../../shared/base-controls/autocomplete-input/autocomplete.models';
import { DefaultCollectionFormValues } from '../../../../core/enums/form-constants';
import { FormService } from '../../../../core/services/form/form.service';

@Component({
  selector: 'app-edit-collection-form',
  templateUrl: './edit-collection-form.component.html',
  styleUrls: ['./edit-collection-form.component.scss'],
})
export class EditCollectionFormComponent {
  private _formService = inject(FormService);
  private _collection: CollectionDto | undefined;

  protected readonly defaultValues = DefaultCollectionFormValues;

  @Input() collectionIdControl: FormControl | undefined;
  @Input() collectionNameControl: FormControl | undefined;
  @Input() parentCollectionControl: FormControl | undefined;
  @Input() options: AutocompleteOption[] = [];
  @Input() filteredOptions: AutocompleteOption[] = [];

  @Input() set collection(collection: CollectionDto | undefined) {
    this._collection = collection;
    this.collectionIdControl?.setValue(collection?.id);
    this.collectionNameControl?.setValue(collection?.name);
    this._formService.registerValueInUsOnCollectionControl(this.collectionNameControl, 'title', collection?.id);
  }

  public get collection() {
    return this._collection;
  }

  @Input() set isEditModeOn(value: boolean) {
    if (!value) {
      this.isNameEdited = value;
      this.isParentEdited = value;
    }
  }

  @Output() isEditModeOnChange = new EventEmitter<boolean>();

  isNameEdited: boolean = false;
  isParentEdited: boolean = false;

  onNameEditButtonClick() {
    this.isNameEdited = true;
    this.isEditModeOnChange.emit(true);
  }

  onParentEditButtonClick() {
    this.isParentEdited = true;
    this.isEditModeOnChange.emit(true);
  }
}
