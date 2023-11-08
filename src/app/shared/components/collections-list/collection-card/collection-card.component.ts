import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionCardDto } from '../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent {
  @Input() collectionCard: CollectionCardDto | undefined;

  @Output() onClick = new EventEmitter<string>();

  clickCard(collectionId: string) {
    this.onClick.emit(collectionId);
  }
}
