import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() control: FormControl | undefined;
  @Input() label: string = '';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
}
