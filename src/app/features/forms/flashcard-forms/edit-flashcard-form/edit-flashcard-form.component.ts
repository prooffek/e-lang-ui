import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormService } from '../../../../core/services/form/form.service';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { NavigationService } from '../../../../core/services/router/navigation.service';
import { FlashcardFormControlNames } from '../../../../core/enums/form-constants';
import { selectCollectionAutocompleteOptions } from '../../../../store/collection-store/selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddOrUpdateFlashcardDto, FlashcardDto, MeaningDto } from '../../../../core/services/api-client/api-client';
import { selectFlashcard } from '../../../../store/flashcard-store/flashcard-store/selectors';
import { AutocompleteOption } from '../../../../shared/base-controls/autocomplete-input/autocomplete.models';
import { SubscribedContainer } from '../../../../core/base/subscribed.container';
import { loadCollectionAutocompleteOptions } from '../../../../store/collection-store/actions';
import { addOrUpdateFlashcard } from '../../../../store/flashcard-store/flashcard-store/actions';

@Component({
  selector: 'app-edit-flashcard-form',
  templateUrl: './edit-flashcard-form.component.html',
  styleUrls: ['./edit-flashcard-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFlashcardFormComponent extends SubscribedContainer implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _store = inject(Store<State>);
  private readonly _changeDetection = inject(ChangeDetectorRef);
  private readonly _navigationService = inject(NavigationService);

  protected readonly controlNames = FlashcardFormControlNames;

  @Input() collectionId: string | undefined;
  @Input() set editFlashcardId(id: string) {
    this.flashcard$ = this._store.select(selectFlashcard(id)).pipe(tap((flashcard) => this.initForm(flashcard)));
  }

  flashcard$: Observable<FlashcardDto> | undefined;

  initForm(flashcard: FlashcardDto) {
    if (!flashcard) return false;

    this.form = this._formService.getFlashcardEditFormGroup(flashcard, this.options);
    this.filteredOptions$ = this.form
      ?.get(this.controlNames.collectionId)
      ?.valueChanges.pipe(map((value) => this._formService.filterOptions(value, this.options())));
    return true;
  }

  options = this._store.selectSignal(selectCollectionAutocompleteOptions);

  form: FormGroup<any> | undefined;

  isFlashcardLoaded = false;

  filteredOptions$: Observable<AutocompleteOption[]> | undefined;

  change$: Observable<any> | undefined = undefined;

  get isDisabled() {
    return this.form?.pristine ? !this.isFlashcardLoaded : this.form?.invalid;
  }

  get wordOrPhraseControl() {
    return this.form?.get(this.controlNames.wordOrPhrase) as FormControl;
  }

  get collectionIdControl() {
    return this.form?.get(this.controlNames.collectionId) as FormControl;
  }

  ngOnInit(): void {
    this._store.dispatch(loadCollectionAutocompleteOptions());
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
      this.isFlashcardLoaded = true;
    }
  }

  saveFlashcard(flashcard: AddOrUpdateFlashcardDto) {
    this._store.dispatch(addOrUpdateFlashcard({ flashcard }));
  }

  closeRightColumn() {
    this._navigationService.navigateToFlashcards();
    this.form?.reset();
  }
}
