import { Component, inject, Input, OnInit } from '@angular/core';
import { CollectionFormControlNames, DefaultCollectionFormValues } from '../../../../core/enums/form-constants';
import { FormService } from '../../../../core/services/form/form.service';
import { map } from 'rxjs/operators';
import { addNewCollection, loadCollectionAutocompleteOptions } from '../../../../store/collection-store/actions';
import { CreateCollectionDto } from '../../../../core/services/api-client/api-client';
import { NavigationService } from '../../../../core/services/router/navigation.service';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { selectCollectionAutocompleteOptions } from '../../../../store/collection-store/selectors';

@Component({
  selector: 'app-add-collection-form',
  templateUrl: './add-collection-form.component.html',
  styleUrls: ['./add-collection-form.component.scss'],
})
export class AddCollectionFormComponent implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _navigationService = inject(NavigationService);
  private readonly _store = inject(Store<State>);

  protected readonly defaultValues = DefaultCollectionFormValues;
  protected readonly controlNames = CollectionFormControlNames;

  @Input() collectionId: string | undefined;

  options = this._store.selectSignal(selectCollectionAutocompleteOptions);
  form = this._formService.getCollectionAddFormGroup(this.options);
  filteredOptions$ = this.form
    .get(this.controlNames.parentCollectionId)
    ?.valueChanges.pipe(map((value) => this._formService.filterOptions(value, this.options())));

  ngOnInit(): void {
    this._store.dispatch(loadCollectionAutocompleteOptions());
  }

  addCollection() {
    this._store.dispatch(addNewCollection({ collection: this.form?.value as CreateCollectionDto }));
    this.form?.reset();
  }

  closeRightColumn() {
    this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    this.form?.reset();
  }
}
