import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  private basePath: string = '../../../assets/icons/';

  private _file: string | undefined;

  @Input() set file(value: string | undefined) {
    this._file = `${this.basePath}${value}`;
  }

  public get file(): string | undefined {
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
