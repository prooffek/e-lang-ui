import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormService } from '../../../../core/services/form/form.service';
import { DefaultFlashcardFormValues, FlashcardFormControlNames } from '../../../../core/enums/form-constants';
import { loadCollectionAutocompleteOptions } from '../../../../store/collection-store/actions';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { map, tap } from 'rxjs/operators';
import { selectCollectionAutocompleteOptions } from '../../../../store/collection-store/selectors';
import { Observable } from 'rxjs';
import { addOrUpdateFlashcard } from '../../../../store/flashcard-store/flashcard-store/actions';
import { SubscribedContainer } from '../../../../core/base/subscribed.container';
import { NavigationService } from '../../../../core/services/router/navigation.service';
import { AddOrUpdateFlashcardDto, MeaningDto } from '../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-add-flashcard-form',
  templateUrl: './add-flashcard-form.component.html',
  styleUrls: ['./add-flashcard-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFlashcardFormComponent extends SubscribedContainer implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _store = inject(Store<State>);
  private readonly _changeDetection = inject(ChangeDetectorRef);
  private readonly _navigationService = inject(NavigationService);

  protected readonly controlNames = FlashcardFormControlNames;

  @Input() collectionId: string | undefined;

  options = this._store.selectSignal(selectCollectionAutocompleteOptions);

  form = this._formService.getFlashcardAddFormGroup(this.options);

  filteredOptions$ = this.form
    .get(this.controlNames.collectionId)
    ?.valueChanges.pipe(map((value) => this._formService.filterOptions(value, this.options())));

  change$: Observable<any> | undefined = undefined;

  isExistingFlashcardUsed = false;

  get isDisabled() {
    return this.form.pristine ? !this.isExistingFlashcardUsed : this.form.invalid;
  }

  ngOnInit(): void {
    this._store.dispatch(loadCollectionAutocompleteOptions());
    this.form.get(this.controlNames.collectionId)?.setValue(this.collectionId ?? null);
    this.change$ = this.form.statusChanges.pipe(
      tap(() => {
        this._changeDetection.markForCheck();
      }),
    );
  }

  markFormAsPristine() {
    this.form?.markAsPristine();
  }

  handleDuplicates(data: { meanings: MeaningDto[]; flashcardBaseId: string }) {
    const { meanings, flashcardBaseId } = data;

    if (meanings.length && this.form) {
      this._changeDetection.markForCheck();
      this._formService.setMeanings(meanings, this.form);
      this.form.get(this.controlNames.flashcardBaseId)?.setValue(flashcardBaseId);
      this.isExistingFlashcardUsed = true;
    }
  }

  closeRightColumn() {
    this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    this.resetForm();
  }

  saveFlashcard(flashcard: AddOrUpdateFlashcardDto) {
    this._store.dispatch(addOrUpdateFlashcard({ flashcard }));
    this.resetForm();
  }

  private resetForm() {
    this._formService.setMeanings(
      [{ id: '', value: DefaultFlashcardFormValues.meaningValue } as MeaningDto],
      this.form,
    );
    this.form.reset();
    this.form.get(this.controlNames.collectionId)?.setValue(this.collectionId);
  }
}
