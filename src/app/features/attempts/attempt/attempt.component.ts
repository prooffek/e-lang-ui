import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/root-state';
import { selectCurrentAttempt } from '../../../store/attempt-store/selectors';
import { getAttemptById } from '../../../store/attempt-store/actions';
import { AttemptDto, FlashcardDto } from '../../../core/services/api-client/api-client';
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

  attempt: Observable<AttemptDto | undefined> | undefined;
  flashcards: FlashcardDto[] = [];

  showList = true;

  private initAttempt(attemptId: string) {
    this._store.dispatch(getAttemptById({ attemptId }));
    this.attempt = this._store.select(selectCurrentAttempt).pipe(
      tap((attempt) => {
        this.flashcards =
          (attempt?.currentStage.flashcards?.map((f) => f.flashcard).filter((f) => !!f) as FlashcardDto[]) ?? [];
      }),
    );
  }
}
