import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidationErrorConstants } from '../../../../core/enums/validation-error-constants';
import { DefaultFlashcardFormValues, FlashcardFormControlNames } from '../../../../core/enums/form-constants';
import { FormService } from '../../../../core/services/form/form.service';

@Component({
  selector: 'app-meaning-inputs',
  templateUrl: './meaning-inputs.component.html',
  styleUrls: ['./meaning-inputs.component.scss'],
})
export class MeaningInputsComponent {
  private readonly _formService = inject(FormService);

  protected readonly ValidationError = ValidationErrorConstants;
  protected readonly controlNames = FlashcardFormControlNames;
  protected readonly defaultValue = DefaultFlashcardFormValues.meaningValue;

  @Input() control: AbstractControl | undefined;

  get meanings() {
    return this.control as FormArray;
  }

  get meaningsControls() {
    const formGroups = this.meanings.controls as FormGroup[];
    return formGroups.map((fg) => fg.controls[this.controlNames.meaningValue]) as FormControl[];
  }

  addMeaning() {
    this.meanings.push(this._formService.getMeaningFormGroup());
  }

  removeMeaning(index: number) {
    this.meanings.removeAt(index);
    this.control?.markAsDirty();
  }
}
