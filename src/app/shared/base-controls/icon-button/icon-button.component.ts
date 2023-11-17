import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() color: ThemePalette;
  @Input() isDisabled: boolean = false;
  @Input() iconName: string = '';
  @Input() iconHeight: string = '20px';

  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit();
  }
}
