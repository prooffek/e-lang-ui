import { Component, inject, Input, OnInit } from '@angular/core';
import { CollectionDto, UpdateCollectionDto } from '../../../../core/services/api-client/api-client';
import { CollectionFormControlNames, DefaultCollectionFormValues } from '../../../../core/enums/form-constants';
import { FormService } from '../../../../core/services/form/form.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { selectCollection, selectCollectionAutocompleteOptions } from '../../../../store/collection-store/selectors';
import {
  deleteCollection,
  loadCollection,
  loadCollectionAutocompleteOptions,
  updateCollection,
} from 'src/app/store/collection-store/actions';
import { NavigationService } from 'src/app/core/services/router/navigation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteOption } from '../../../../shared/base-controls/autocomplete-input/autocomplete.models';

@Component({
  selector: 'app-edit-collection-form',
  templateUrl: './edit-collection-form.component.html',
  styleUrls: ['./edit-collection-form.component.scss'],
})
export class EditCollectionFormComponent implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _store = inject(Store<State>);
  private readonly _navigationService = inject(NavigationService);
  private _editCollectionId: string | undefined;

  protected readonly defaultValues = DefaultCollectionFormValues;
  protected readonly controlNames = CollectionFormControlNames;

  @Input() collectionId: string | undefined;
  @Input() set editCollectionId(value: string | undefined) {
    this._editCollectionId = value;
    if (value) {
      this.form = this._formService.getCollectionEditFormGroup(this.options, value);
      this._store.dispatch(loadCollection({ id: value }));
      this.collection$ = this._store.select(selectCollection(value)).pipe(
        tap((collection) => {
          if (collection) {
            this.form?.get(this.controlNames.id)?.setValue(collection.id);
            this.form?.get(this.controlNames.name)?.setValue(collection.name);
            this.form?.get(this.controlNames.parentCollectionId)?.setValue(collection.parentId ?? null);
          }
        }),
      );
      this.filteredOptions$ = this.form
        ?.get(this.controlNames.parentCollectionId)
        ?.valueChanges.pipe(map((value) => this._formService.filterOptions(value, this.options())));
    }
  }

  options = this._store.selectSignal(selectCollectionAutocompleteOptions);
  collection$: Observable<CollectionDto | undefined> | undefined;

  isNameEdited: boolean = false;
  isParentEdited: boolean = false;
  form:
    | FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        parentCollectionId: FormControl<string | null>;
      }>
    | undefined = undefined;
  filteredOptions$: Observable<AutocompleteOption[] | undefined> | undefined = undefined;

  ngOnInit(): void {
    this._store.dispatch(loadCollectionAutocompleteOptions());
  }

  onNameEditButtonClick() {
    this.isNameEdited = true;
  }

  onParentEditButtonClick() {
    this.isParentEdited = true;
  }

  editCollection() {
    const collection = this.form?.value as UpdateCollectionDto;
    if (!collection.parentCollectionId && collection.parentCollectionId !== undefined)
      collection.parentCollectionId = undefined;
    this._store.dispatch(updateCollection({ collection }));
  }

  removeCollection() {
    if (this._editCollectionId) {
      this._store.dispatch(deleteCollection({ id: this._editCollectionId }));
      this.closeRightColumn();
    }
  }

  closeRightColumn() {
    this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    this.form?.reset();
  }

  cancel() {
    this.isNameEdited = false;
    this.isParentEdited = false;
  }
}
