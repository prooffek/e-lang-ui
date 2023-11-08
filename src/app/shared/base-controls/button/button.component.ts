import { Component, inject, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IconService } from '../../../core/services/icons/icon.service';
import { SizeNames } from '../../../core/enums/formatEnums';

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
  @Input() size: SizeNames = SizeNames.medium;
  @Input()
  set iconFile(value: string | undefined) {
    this._iconFile = value;
    if (value) {
      this._iconService.registerIcon(value);
    }
  }

  public get iconFile(): string | undefined {
    return this._iconFile;
  }
}
