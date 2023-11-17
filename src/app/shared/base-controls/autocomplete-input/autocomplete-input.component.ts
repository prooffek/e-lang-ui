import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AutocompleteOption } from './autocomplete.models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnChanges {
  @Input() label: string = '';
  @Input() options: AutocompleteOption[] = [];
  @Input() filteredOptions: AutocompleteOption[] = [];
  @Input() control: FormControl | undefined;
  @Input() showClearButton = true;
  @Input() defaultValue: any = undefined;
  @Input() changeEmptyToDefault = true;

  getName(id: string) {
    return this.options?.find((x) => x.id === id)?.name ?? this.defaultValue;
  }

  clearValue() {
    this.control?.setValue(this.defaultValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.changeEmptyToDefault && !this.control?.value) {
      this.control?.setValue(this.defaultValue);
    }
  }
}
