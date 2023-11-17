import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IconService } from '../../../core/services/icons/icon.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  private readonly _iconService = inject(IconService);
  private _iconFile: string | undefined;

  @Input() label: string = '';
  @Input() color: ThemePalette;
  @Input() isDisabled: boolean = false;
  @Input() width = '150px';
  @Input() height = '40px';

  @Input()
  set iconFile(value: string | undefined) {
    this._iconFile = value;
    if (value) {
      this._iconService.registerIcon(value);
    }
  }

  @Output() onClick = new EventEmitter();

  public get iconFile(): string | undefined {
    return this._iconFile;
  }

  click() {
    this.onClick.emit();
  }
}
