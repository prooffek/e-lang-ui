import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { CollectionStore } from '../../stores/collections-store/store';
import { CollectionDto } from '../../core/services/api-client/api-client';
import { NavigationService } from '../../core/services/router/navigation.service';
import { TabName } from '../../core/enums/topbar-constants';
import { Columns } from '../../core/enums/route-constants';

@Component({
  selector: 'app-collections-view',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit, OnChanges {
  private readonly _navigationService = inject(NavigationService);
  private readonly _collectionStore = inject(CollectionStore);

  protected readonly columnEnum = Columns;

  @Input() collectionId: string | undefined;
  @Input() columns: string = this.columnEnum.singleColumn;

  currentCollection: Signal<CollectionDto | undefined> = this._collectionStore.getCurrentCollection;
  mainCollectionCards = this._collectionStore.getInitCollectionCards();
  hasParam: boolean = false;

  ngOnInit(): void {
    this._collectionStore.loadInitCollectionCards();
  }

  selectCollection(collectionId: string) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }

  navigateBack(collectionId: string | undefined) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }

  openAddForm() {
    this._navigationService.navigateToCollectionAddForm(this.collectionId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasParam = !!this.collectionId && this.collectionId !== TabName.collections;
    if (this.collectionId && this.hasParam) {
      this._collectionStore.loadCurrentCollection(this.collectionId);
    }
  }

  removeCollection(collectionId: string) {
    this._collectionStore.deleteCollection(collectionId);
  }
}
