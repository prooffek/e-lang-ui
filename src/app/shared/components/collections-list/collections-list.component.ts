import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionCardDto } from '../../../core/services/api-client/api-client';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss'],
})
export class CollectionsListComponent {
  @Input() collectionCards: CollectionCardDto[] = [];
  @Input() collectionName: string | undefined;

  @Output() onCollectionSelect = new EventEmitter<string>();

  selectCollection(collectionId: string) {
    this.onCollectionSelect.emit(collectionId);
  }
}
