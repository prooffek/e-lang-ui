import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationErrorAttribute, ValidationErrorConstants } from '../../../core/enums/validation-error-constants';

export type ShowErrorOn = 'touched' | 'dirty';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() control: FormControl | undefined;
  @Input() showErrorOn: ShowErrorOn = 'touched';

  protected readonly ValidationError = ValidationErrorConstants;
  protected readonly ValidationErrorAttribute = ValidationErrorAttribute;
}
