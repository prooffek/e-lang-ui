import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() label: string | undefined;
  @Input() isActive: boolean = false;
  @Input() imgFilePrefix: string | undefined;
  @Input() imgSize: string = '24px';

  @Output() onClick = new EventEmitter<string>();

  click() {
    this.onClick.emit(this.label);
  }
}
