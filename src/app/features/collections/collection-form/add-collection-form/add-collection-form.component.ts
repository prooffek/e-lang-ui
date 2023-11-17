import { Component, inject, Input, OnInit } from '@angular/core';
import { DefaultCollectionFormValues } from '../../../../core/enums/form-constants';
import { FormControl } from '@angular/forms';
import { AutocompleteOption } from '../../../../shared/base-controls/autocomplete-input/autocomplete.models';
import { FormService } from '../../../../core/services/form/form.service';

const NAME_ATTRIBUTE = 'title';

@Component({
  selector: 'app-add-collection-form',
  templateUrl: './add-collection-form.component.html',
  styleUrls: ['./add-collection-form.component.scss'],
})
export class AddCollectionFormComponent implements OnInit {
  private readonly _formService = inject(FormService);
  protected readonly defaultValues = DefaultCollectionFormValues;

  @Input() collectionNameControl: FormControl | undefined;
  @Input() parentCollectionControl: FormControl | undefined;
  @Input() options: AutocompleteOption[] = [];
  @Input() filteredOptions: AutocompleteOption[] = [];

  ngOnInit(): void {
    this.collectionNameControl?.setValue(undefined);
    this._formService.registerValueInUsOnCollectionControl(this.collectionNameControl, NAME_ATTRIBUTE);
  }
}
