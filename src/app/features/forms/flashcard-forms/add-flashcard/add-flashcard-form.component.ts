import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormService } from '../../../../core/services/form/form.service';
import { DefaultFlashcardFormValues, FlashcardFormControlNames } from '../../../../core/enums/form-constants';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { loadCollectionAutocompleteOptions } from '../../../../store/collection-store/actions';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/root-state';
import { map, skipWhile, take, takeUntil, tap } from 'rxjs/operators';
import { selectCollectionAutocompleteOptions } from '../../../../store/collection-store/selectors';
import { Observable } from 'rxjs';
import { addFlashcard } from '../../../../store/flashcard-store/flashcard-store/actions';
import { MatDialog } from '@angular/material/dialog';
import { DuplicatesDialogComponent } from '../duplicates-dialog/duplicates-dialog.component';
import { SubscribedContainer } from '../../../../core/base/subscribed.container';
import { DuplicatesDialogData } from '../duplicates-dialog/duplicates-dialog.model';
import { NavigationService } from '../../../../core/services/router/navigation.service';
import { AddOrUpdateFlashcardDto, FlashcardDto } from '../../../../core/services/api-client/api-client';
import { FlashcardOdataService } from '../../../../core/services/odata/flashcard-odata.service';
import { ValidationErrorConstants } from '../../../../core/enums/validation-error-constants';
import { FlashcardModifiedDialogComponent } from '../flashcard-modified-dialog/flashcard-modified-dialog.component';
import { FlashcardService } from '../../../../core/services/models/flashcard.service';
import { FormActions } from '../../../../core/enums/actions';

@Component({
  selector: 'app-add-flashcard-form',
  templateUrl: './add-flashcard-form.component.html',
  styleUrls: ['./add-flashcard-form.component.scss'],
})
export class AddFlashcardFormComponent extends SubscribedContainer implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _store = inject(Store<State>);
  private readonly _changeDetection = inject(ChangeDetectorRef);
  private readonly _dialog = inject(MatDialog);
  private readonly _navigationService = inject(NavigationService);
  private readonly _flashcardOdataService = inject(FlashcardOdataService);
  private readonly _flashcardService = inject(FlashcardService);
  protected _isExistingFlashcardUsed = false;

  protected readonly controlNames = FlashcardFormControlNames;
  protected readonly defaultValues = DefaultFlashcardFormValues;
  protected readonly ValidationError = ValidationErrorConstants;

  @Input() collectionId: string | undefined;

  options = this._store.selectSignal(selectCollectionAutocompleteOptions);

  form = this._formService.getFlashcardAddFormGroup(this.options);

  filteredOptions$ = this.form
    .get(this.controlNames.collectionId)
    ?.valueChanges.pipe(map((value) => this._formService.filterOptions(value, this.options())));

  change$: Observable<any> | undefined = undefined;

  get getMeaningControls() {
    const formArray = this.form.get(this.controlNames.meanings) as FormArray;
    const formGroups = formArray.controls as FormGroup[];
    return formGroups.map((fg) => fg.controls[this.controlNames.meaningValue]) as FormControl[];
  }

  get meanings() {
    return this.form.get(this.controlNames.meanings) as FormArray;
  }

  get isDisabled() {
    return this.form.pristine ? !this._isExistingFlashcardUsed : this.form.invalid;
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

  addMeaning() {
    this.meanings.push(this._formService.getMeaningFormGroup());
  }

  removeMeaning(index: number) {
    this.meanings.removeAt(index);
  }

  handleDuplicates() {
    const wordOrPhrase = this.form.get(this.controlNames.wordOrPhrase)?.value;

    if (wordOrPhrase && this.form.get(this.controlNames.wordOrPhrase)?.dirty) {
      this._flashcardOdataService
        .getDuplicatesByWordOrPhrase(this.form.get(this.controlNames.wordOrPhrase)?.value)
        .pipe(
          takeUntil(this.destroyed$),
          skipWhile((value: FlashcardDto[]) => !value.length),
          take(1),
          map(
            (duplicates) =>
              ({
                wordOrPhrase: this.form.get(this.controlNames.wordOrPhrase)?.value,
                duplicates,
              }) as DuplicatesDialogData,
          ),
          tap((data) => this.openDuplicatedDialog(data)),
        )
        .subscribe();
    }
  }

  save() {
    const flashcardBaseId: string | undefined = this.form.get(this.controlNames.flashcardBaseId)?.value || null;

    if (flashcardBaseId) {
      this.handleModifications(flashcardBaseId);
    } else {
      const flashcard = this.getAddOrUpdateFlashcardFromForm();
      this.saveFlashcard(flashcard);
    }
  }

  closeRightColumn() {
    this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    this.resetForm();
  }

  private saveFlashcard(flashcard: AddOrUpdateFlashcardDto) {
    this._store.dispatch(addFlashcard({ flashcard }));
    this.resetForm();
  }

  private getAddOrUpdateFlashcardFromForm() {
    const wordOrPhrase: string = this.form.get(this.controlNames.wordOrPhrase)?.value;
    const flashcardBaseId: string | undefined = this.form.get(this.controlNames.flashcardBaseId)?.value || null;
    const collectionId: string = this.form.get(this.controlNames.collectionId)?.value;
    let meanings: { id?: string; value: string }[] = this.form.get(this.controlNames.meanings)?.value;

    return this._flashcardService.getAddOrUpdateFlashcardDto({ wordOrPhrase, collectionId, meanings, flashcardBaseId });
  }

  private openDuplicatedDialog(dialogData: DuplicatesDialogData) {
    const dialogRef = this._dialog.open(DuplicatesDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        tap((result: FlashcardDto) => {
          if (result) {
            this.setValuesFromFlashcardBase(result);
            this._isExistingFlashcardUsed = true;
            this.form.markAsPristine();
          }
        }),
      )
      .subscribe();
  }

  private setValuesFromFlashcardBase(flashcard: FlashcardDto) {
    if (flashcard?.meanings?.length) {
      this._changeDetection.markForCheck();
      this._formService.setMeanings(flashcard.meanings, this.form);
      this.form.get(this.controlNames.flashcardBaseId)?.setValue(flashcard.flashcardBaseId);
      this.form.get(this.controlNames.wordOrPhrase)?.markAsPristine();
    }
  }

  private handleModifications(flashcardBaseId: string) {
    this._flashcardOdataService
      .getByFlashcardBaseId(flashcardBaseId)
      .pipe(
        takeUntil(this.destroyed$),
        skipWhile((value) => !value.length),
        take(1),
        tap((flashcards: FlashcardDto[]) => {
          const newFlashcard = this.getAddOrUpdateFlashcardFromForm();
          const flashcard = flashcards[0];

          if (this.areFlashcardsEqual(flashcard, newFlashcard)) {
            this.saveFlashcard(newFlashcard);
          } else {
            this.openFlashcardBaseModifiedDialog(flashcards);
          }
        }),
      )
      .subscribe();
  }

  private openFlashcardBaseModifiedDialog(flashcards: FlashcardDto[]) {
    const dialogRef = this._dialog.open(FlashcardModifiedDialogComponent, { data: flashcards });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        take(1),
        map((action: FormActions) => {
          return this.getAddOrUpdateFlashcardDtoBasedOnAction(flashcards[0], action);
        }),
        tap((flashcard: AddOrUpdateFlashcardDto | undefined) => {
          if (flashcard) {
            this.saveFlashcard(flashcard);
          }
        }),
      )
      .subscribe();
  }

  private areFlashcardsEqual(flashcard1: FlashcardDto, flashcard2: AddOrUpdateFlashcardDto) {
    const meanings1 = flashcard1.meanings.sort((a, b) => a.value.localeCompare(b.value));
    const meanings2 = flashcard2.meanings.sort((a, b) => a.value.localeCompare(b.value));

    if (flashcard1.wordOrPhrase.toLowerCase() === flashcard2.wordOrPhrase.toLowerCase()) {
      return (
        meanings1.length === meanings2.length &&
        !meanings1.filter((meaning, index) => {
          return meaning.id !== meanings2[index].id || meaning.value !== meanings2[index].value;
        }).length
      );
    }

    return false;
  }

  private getAddOrUpdateFlashcardDtoBasedOnAction(originalFlashcard: FlashcardDto, action: FormActions) {
    switch (action) {
      case FormActions.useExisting:
        return this._flashcardService.getAddOrUpdateFlashcardDto({
          ...originalFlashcard,
          collectionId: this.form.get(this.controlNames.collectionId)?.value,
        });
      case FormActions.updateExisting:
        return this.getAddOrUpdateFlashcardFromForm();
      case FormActions.duplicate:
        const flashcard = this.getAddOrUpdateFlashcardFromForm();
        flashcard.flashcardBaseId = undefined;
        flashcard.meanings.forEach((m) => (m.id = undefined));
        return flashcard;
      default:
        return;
    }
  }

  private resetForm() {
    this.form.reset();
    this.form.get(this.controlNames.collectionId)?.setValue(this.collectionId);
  }
}
