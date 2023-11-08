import { Component, inject, Input } from '@angular/core';
import { IconService } from '../../../core/services/icons/icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  private readonly _iconService = inject(IconService);
  private _file: string = '';

  @Input() set file(value: string) {
    this._file = value;
    this._iconService.registerIcon(value);
  }

  public get file(): string {
    return this._file;
  }

  @Input() height: string | undefined;
  @Input() width: string | undefined;

  getStyle() {
    let style = '';

    style += `height: ${this.height ? this.height : 'auto'};`;
    style += `width: ${this.width ? this.width : 'auto'};`;

    return style;
  }
}
