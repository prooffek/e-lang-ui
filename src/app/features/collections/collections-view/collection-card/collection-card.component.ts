import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CollectionCardDto } from '../../../../core/services/api-client/api-client';
import { SizeNames } from '../../../../core/enums/format-constants';
import { NavigationService } from '../../../../core/services/router/navigation.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent {
  private readonly _navigateService = inject(NavigationService);

  @Input() collectionCard: CollectionCardDto | undefined;
  @Input() collectionId: string | undefined;

  @Output() onClick = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();
  @Output() onLearn = new EventEmitter<string>();

  size = SizeNames;

  clickCard(collectionId: string) {
    this.onClick.emit(collectionId);
  }

  edit() {
    if (this.collectionCard?.id)
      this._navigateService.navigateToCollectionEditForm(this.collectionCard?.id, this.collectionId);
  }

  remove(collectionId: string) {
    this.onRemove.emit(collectionId);
  }

  learn(collectionId: string) {
    this.onLearn.emit(collectionId);
  }
}
