import { Component, inject, Input } from '@angular/core';
import { FlashcardViewModel } from '../flashcard-view/flashcard-view.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/root-state';
import { removeSelectedFlashcards } from '../../../store/flashcard-store/flashcard-store/actions';

@Component({
  selector: 'app-flashcard-view-actions',
  templateUrl: './flashcard-view-actions.component.html',
  styleUrls: ['./flashcard-view-actions.component.scss'],
})
export class FlashcardViewActionsComponent {
  private readonly _store = inject(Store<State>);

  @Input() selectedFlashcards: FlashcardViewModel[] = [];

  remove() {
    const flashcardIds = this.selectedFlashcards.map((f) => f.id);
    this._store.dispatch(removeSelectedFlashcards({ flashcardIds }));
  }
}
