import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
  @Input() width: string = '100%';
  @Input() backgroundColor: string = 'var(--main-body-border)';
  @Input() height: string = '3px';
  @Input() margins: string = '0 0 30px';

  getStyle() {
    return {
      width: this.width,
      backgroundColor: this.backgroundColor,
      height: this.height,
      margin: this.margins,
    };
  }
}
