import { Component, Input } from '@angular/core';
import { DropdownOption } from './dopdown.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() options: DropdownOption<any>[] = [];
  @Input() control: FormControl | undefined;
}
