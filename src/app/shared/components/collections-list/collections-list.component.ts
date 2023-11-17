import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionCardDto } from '../../../core/services/api-client/api-client';
import { Columns } from '../../../core/enums/route-constants';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss'],
})
export class CollectionsListComponent {
  protected readonly columnEnum = Columns;

  @Input() collectionCards: CollectionCardDto[] = [];
  @Input() collectionName: string | undefined;
  @Input() columns: string = this.columnEnum.singleColumn;
  @Input() collectionId: string | undefined;

  @Output() onCollectionSelect = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  selectCollection(collectionId: string) {
    this.onCollectionSelect.emit(collectionId);
  }

  removeCollection(collectionId: string) {
    this.onRemove.emit(collectionId);
  }
}
