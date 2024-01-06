import { Component, inject, Input, Signal } from '@angular/core';
import { AttemptDto, FlashcardOrder } from '../../../../core/services/api-client/api-client';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { selectAttemptById } from '../../../../store/attempt-store/selectors';
import { deleteAttempt, getAttemptsForCollection } from '../../../../store/attempt-store/actions';
import { NavigationService } from '../../../../core/services/router/navigation.service';

@Component({
  selector: 'app-attempt-details',
  templateUrl: './attempt-details.component.html',
  styleUrls: ['./attempt-details.component.scss'],
})
export class AttemptDetailsComponent {
  private readonly _store = inject(Store<State>);
  private readonly _navigationService = inject(NavigationService);
  private _collectionId: string | undefined;
  private _attemptId: string | undefined;

  protected orderEnum = FlashcardOrder;

  @Input() set collectionId(value: string | undefined) {
    this._collectionId = value;

    if (this._collectionId) {
      this._store.dispatch(getAttemptsForCollection({ collectionId: this._collectionId }));
    }
  }

  get collectionId() {
    return this._collectionId;
  }

  @Input() set attemptId(value: string | undefined) {
    this._attemptId = value;
    if (this._attemptId) {
      this.attempt = this._store.selectSignal(selectAttemptById(this._attemptId));
    }
  }

  get attemptId() {
    return this._attemptId;
  }

  attempt: Signal<AttemptDto | undefined> | undefined;

  remove(attempt: AttemptDto) {
    this._store.dispatch(deleteAttempt({ attempt }));
    this.close(attempt.collectionId);
  }

  close(collectionId: string) {
    this._navigationService.navigateToAttempts(collectionId);
  }

  protected readonly deleteAttempt = deleteAttempt;
}
