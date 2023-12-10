import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  @Output() onBlur = new EventEmitter();

  clearValue() {
    this.control?.setValue(this.defaultValue);
  }

  blur() {
    this.onBlur.emit();
  }
}
