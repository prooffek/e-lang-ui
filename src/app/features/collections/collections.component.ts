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
import {
  selectCurrentCollection,
  selectCurrentCollectionFlashcardModels,
  selectInitCollectionCards,
} from 'src/app/store/collection-store/selectors';
import { FlashcardViewModel } from '../flashcards/flashcard-view/flashcard-view.model';
import { removeSelectedFlashcards } from '../../store/flashcard-store/flashcard-store/actions';

@Component({
  selector: 'app-collections',
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
  flashcards = this._store.selectSignal(selectCurrentCollectionFlashcardModels);
  mainCollectionCards = this._store.selectSignal(selectInitCollectionCards);
  selectedFlashcards: FlashcardViewModel[] = [];
  hasParam: boolean = false;
  areFlashcardsVisible = false;

  ngOnInit(): void {
    this._store.dispatch(loadInitialCollectionCards());
  }

  selectCollection(collectionId: string) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }

  navigateBack(collectionId: string | undefined) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }

  openAddCollectionForm() {
    this._navigationService.navigateToCollectionAddForm(this.collectionId);
  }

  openAddFlashcardForm() {
    this._navigationService.navigateToFlashcardAddForm(this.collectionId);
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

  selectFlashcards(flashcards: FlashcardViewModel[]) {
    this.selectedFlashcards = flashcards;
  }

  removeSelectedFlashcards() {
    const flashcardIds = this.selectedFlashcards.map((f) => f.id);
    this._store.dispatch(removeSelectedFlashcards({ flashcardIds }));
  }

  learnCollection() {
    if (this.collectionId) {
      this._navigationService.navigateToAttempts(this.collectionId);
    }
  }
}
