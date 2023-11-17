import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { CollectionFormControlNames, FormType } from '../../../core/enums/form-constants';
import { FormService } from '../../../core/services/form/form.service';
import { FormStore } from '../../../stores/form-store/store';
import { CollectionStore } from '../../../stores/collections-store/store';
import { CollectionDto, CreateCollectionDto, UpdateCollectionDto } from '../../../core/services/api-client/api-client';
import { NavigationService } from '../../../core/services/router/navigation.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss'],
})
export class CollectionFormComponent implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _formStore = inject(FormStore);
  private readonly _collectionStore = inject(CollectionStore);
  private readonly _navigationService = inject(NavigationService);

  private _collectionId: string | undefined = undefined;
  private _editCollectionId: string | undefined = undefined;

  protected title: string = '';
  protected isEditForm: boolean = false;

  @Input() set formType(value: FormType) {
    this.title = `${value} collection`;
    this.isEditForm = value === FormType.edit;
  }

  @Input() set collectionId(id: string | undefined) {
    this._collectionId = id;
    this.form.reset();
    if (id) {
      this.form.get(CollectionFormControlNames.parentCollectionId)?.setValue(id);
    }
  }

  public get collectionId() {
    return this._collectionId;
  }

  @Input() set editCollectionId(id: string | undefined) {
    this._editCollectionId = id;
    this.form.reset();

    if (id) {
      this._collectionStore.loadCollection(this.editCollectionId!);
      this.editedCollection = this._collectionStore.getCollection(this.editCollectionId);
    }

    if (!this.collectionId && this.editedCollection) {
      this.form.get(CollectionFormControlNames.parentCollectionId)?.setValue(this.editedCollection()?.parentId ?? null);
    }
  }

  public get editCollectionId() {
    return this._editCollectionId;
  }

  controlNames = CollectionFormControlNames;
  options = this._formStore.getCollectionAutocompleteData;
  form = this._formService.getCollectionFormGroup();
  editedCollection: Signal<CollectionDto | undefined> | undefined = undefined;
  isEditModeOn: boolean = false;

  filteredOptions = this._formStore.getFilteredOptions(
    this.form.controls[CollectionFormControlNames.parentCollectionId],
    this.options,
  );

  ngOnInit(): void {
    this._formStore.loadCollectionAutocompleteData();
  }

  addCollection() {
    this._collectionStore.addNewCollection(this.form.value as CreateCollectionDto);
    this.form.reset();
  }

  editCollection() {
    this._collectionStore.editCollection(this.form.value as UpdateCollectionDto);
  }

  removeCollection() {
    if (this.editCollectionId) {
      this._collectionStore.deleteCollection(this.editCollectionId);
      this.closeRightColumn();
    }
  }

  closeRightColumn() {
    this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    this.form.reset();
  }

  cancel() {
    this.isEditModeOn = false;
  }
}
