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
import { CollectionDto } from '../../core/services/api-client/api-client';
import { NavigationService } from '../../core/services/router/navigation.service';
import { TabName } from '../../core/enums/topbar-constants';
import { Columns } from '../../core/enums/route-constants';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/root-state';
import {
  deleteCollection,
  loadCurrentCollection,
  loadInitialCollectionCards,
} from 'src/app/store/collection-store/actions';
import { selectCurrentCollection, selectInitCollectionCards } from 'src/app/store/collection-store/selectors';

@Component({
  selector: 'app-collections-view',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit, OnChanges {
  private readonly _navigationService = inject(NavigationService);
  private readonly _store = inject(Store<State>);

  protected readonly columnEnum = Columns;

  @Input() collectionId: string | undefined;
  @Input() columns: string = this.columnEnum.singleColumn;

  currentCollection: Signal<CollectionDto | undefined> = this._store.selectSignal(selectCurrentCollection);
  mainCollectionCards = this._store.selectSignal(selectInitCollectionCards);
  hasParam: boolean = false;

  ngOnInit(): void {
    this._store.dispatch(loadInitialCollectionCards());
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
      this._store.dispatch(loadCurrentCollection({ id: this.collectionId }));
    }
  }

  removeCollection(collectionId: string) {
    this._store.dispatch(deleteCollection({ id: collectionId }));
  }
}
