import { Component, computed, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/root-state';
import {
  selectCurrentAttempt,
  selectCurrentExercise,
  selectMeaningsByFlashcardStateId,
} from '../../../store/attempt-store/selectors';
import { getAttemptById, getNextExercise } from '../../../store/attempt-store/actions';
import { AttemptDto, AttemptStageType, FlashcardDto } from '../../../core/services/api-client/api-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss'],
})
export class AttemptComponent {
  private readonly _store = inject(Store<State>);
  private _attemptId: string | undefined;

  protected attemptStage = AttemptStageType;

  @Input() set attemptId(value: string | undefined) {
    this._attemptId = value;
    this.showList = true;

    if (this._attemptId) {
      this.initAttempt(this._attemptId);
    }
  }

  get attemptId() {
    return this._attemptId;
  }

  attempt$: Observable<AttemptDto | undefined> | undefined;
  exercise = this._store.selectSignal(selectCurrentExercise);
  meanings = computed(() => {
    const flashcardStateId = this.exercise()?.flashcardStateId;

    if (flashcardStateId) {
      const meanings = this._store.selectSignal(selectMeaningsByFlashcardStateId(flashcardStateId));
      return meanings();
    }

    return;
  });

  flashcards: FlashcardDto[] = [];

  showList = true;

  continue(data: { attemptId: string; flashcardStateId?: string; isAnswerCorrect?: boolean }) {
    this._store.dispatch(getNextExercise(data));
    this.showList = false;
  }

  private initAttempt(attemptId: string) {
    this._store.dispatch(getAttemptById({ attemptId }));
    this.attempt$ = this._store.select(selectCurrentAttempt).pipe(
      tap((attempt) => {
        this.flashcards =
          (attempt?.currentStage?.flashcards?.map((f) => f.flashcard).filter((f) => !!f) as FlashcardDto[]) ?? [];
      }),
    );
    /*
    this.continue({ attemptId });*/
  }
}
