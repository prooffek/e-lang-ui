import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShowErrorOn } from '../input-error/input-error.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control: FormControl | undefined;
  @Input() showClearButton = true;
  @Input() defaultValue: any = undefined;
  @Input() showErrorOn: ShowErrorOn = 'touched';

  clearValue() {
    this.control?.setValue(this.defaultValue);
  }
}
