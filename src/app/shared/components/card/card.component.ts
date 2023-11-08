import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItem } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cardItem: CardItem | undefined;
  @Output() onClick = new EventEmitter<string>();

  clickCard() {
    if (!this.cardItem?.id) return;

    this.onClick.emit(this.cardItem!.id);
  }
}
