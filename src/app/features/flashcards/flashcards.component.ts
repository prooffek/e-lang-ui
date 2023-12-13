import { Component, inject, Input } from '@angular/core';
import { Columns } from '../../core/enums/route-constants';
import { Store } from '@ngrx/store';
import { State } from '../../store/root-state';
import { loadFlashcards } from '../../store/flashcard-store/flashcard-store/actions';
import { selectAllFlashcardModels } from '../../store/flashcard-store/flashcard-store/selectors';
import { FlashcardViewModel } from './flashcard-view/flashcard-view.model';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
})
export class FlashcardsComponent {
  private readonly _store = inject(Store<State>);

  protected readonly columnEnum = Columns;

  @Input() columns: string = this.columnEnum.singleColumn;

  flashcards = this._store.selectSignal(selectAllFlashcardModels);
  selectedFlashcards: FlashcardViewModel[] = [];

  constructor() {
    this._store.dispatch(loadFlashcards());
  }

  changeSelection(selected: FlashcardViewModel[]) {
    this.selectedFlashcards = selected;
  }
}
