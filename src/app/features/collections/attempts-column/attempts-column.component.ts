import { Component, inject, Input, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/root-state';
import { selectAttemptsByCollectionId } from '../../../store/attempt-store/selectors';
import { deleteAttempt, getAttemptsForCollection } from '../../../store/attempt-store/actions';
import { AttemptDto } from '../../../core/services/api-client/api-client';
import { selectCurrentCollectionName } from '../../../store/collection-store/selectors';
import { NavigationService } from '../../../core/services/router/navigation.service';

@Component({
  selector: 'app-attempts-column',
  templateUrl: './attempts-column.component.html',
  styleUrls: ['./attempts-column.component.scss'],
})
export class AttemptsColumnComponent {
  private readonly _store = inject(Store<State>);
  private readonly _navigationService = inject(NavigationService);

  private _collectionId: string | undefined;

  @Input() set collectionId(value: string | undefined) {
    if (value) {
      this._collectionId = value;
      this._store.dispatch(getAttemptsForCollection({ collectionId: this._collectionId }));
      this.attempts = this._store.selectSignal(selectAttemptsByCollectionId(this._collectionId));
      this.collectionName = this._store.selectSignal(selectCurrentCollectionName);
      this.isAddFormVisible = false;
    }
  }

  get collectionId() {
    return this._collectionId;
  }

  attempts: Signal<AttemptDto[]> | undefined;
  collectionName: Signal<string | undefined> | undefined;
  isAddFormVisible = false;

  showForm() {
    this.isAddFormVisible = true;
  }

  hideForm(attempts: AttemptDto[]) {
    if (attempts?.length) {
      this.isAddFormVisible = false;
    } else {
      this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    }
  }

  delete(attempt: AttemptDto) {
    this._store.dispatch(deleteAttempt({ attempt }));
  }

  showDetails(attempt: AttemptDto) {
    this._navigationService.navigateToAttemptDetails(attempt);
  }
}
