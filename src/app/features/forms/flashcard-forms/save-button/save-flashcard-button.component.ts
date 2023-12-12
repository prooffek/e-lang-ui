import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FlashcardFormControlNames } from '../../../../core/enums/form-constants';
import { map, skipWhile, take, takeUntil, tap } from 'rxjs/operators';
import { AddOrUpdateFlashcardDto, FlashcardDto } from '../../../../core/services/api-client/api-client';
import { FlashcardOdataService } from '../../../../core/services/odata/flashcard-odata.service';
import { SubscribedContainer } from '../../../../core/base/subscribed.container';
import { FlashcardService } from '../../../../core/services/models/flashcard.service';
import { FlashcardModifiedDialogComponent } from '../flashcard-modified-dialog/flashcard-modified-dialog.component';
import { FormActions } from '../../../../core/enums/actions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-flashcard-button.component.html',
  styleUrls: ['./save-flashcard-button.component.scss'],
})
export class SaveFlashcardButtonComponent extends SubscribedContainer {
  private readonly _flashcardOdataService = inject(FlashcardOdataService);
  private readonly _flashcardService = inject(FlashcardService);
  private readonly _dialog = inject(MatDialog);

  @Input() form: FormGroup | undefined;
  @Input() isDisabled = false;

  @Output() onSave = new EventEmitter<AddOrUpdateFlashcardDto>();

  save() {
    const flashcardBaseId: string | undefined =
      this.form?.get(FlashcardFormControlNames.flashcardBaseId)?.value || null;

    if (flashcardBaseId) {
      this.handleModifications(flashcardBaseId);
    } else {
      const flashcard = this.getAddOrUpdateFlashcardFromForm();
      this.saveFlashcard(flashcard);
    }
  }

  private saveFlashcard(flashcard: AddOrUpdateFlashcardDto) {
    this.onSave.emit(flashcard);
  }

  private handleModifications(flashcardBaseId: string) {
    this._flashcardOdataService
      .getByFlashcardBaseId(flashcardBaseId)
      .pipe(
        takeUntil(this.destroyed$),
        skipWhile((value) => !value.length),
        take(1),
        map((flashcards: FlashcardDto[]) =>
          flashcards.filter((f) => f.collectionId !== this.form?.get(FlashcardFormControlNames.collectionId)?.value),
        ),
        tap((flashcards: FlashcardDto[]) => {
          const newFlashcard = this.getAddOrUpdateFlashcardFromForm();

          if (!flashcards.length || this._flashcardService.areFlashcardsEqual(flashcards[0], newFlashcard)) {
            this.saveFlashcard(newFlashcard);
          } else {
            this.openFlashcardBaseModifiedDialog(flashcards);
          }
        }),
      )
      .subscribe();
  }

  private getAddOrUpdateFlashcardFromForm() {
    const flashcardId = this.form?.get(FlashcardFormControlNames.flashcardId)?.value;
    const wordOrPhrase: string = this.form?.get(FlashcardFormControlNames.wordOrPhrase)?.value;
    const flashcardBaseId: string | undefined =
      this.form?.get(FlashcardFormControlNames.flashcardBaseId)?.value || null;
    const collectionId: string = this.form?.get(FlashcardFormControlNames.collectionId)?.value;
    let meanings: { id?: string; value: string }[] = this.form?.get(FlashcardFormControlNames.meanings)?.value;

    return this._flashcardService.getAddOrUpdateFlashcardDto({
      flashcardId,
      wordOrPhrase,
      collectionId,
      meanings,
      flashcardBaseId,
    });
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

  private getAddOrUpdateFlashcardDtoBasedOnAction(originalFlashcard: FlashcardDto, action: FormActions) {
    switch (action) {
      case FormActions.useExisting:
        return this._flashcardService.getAddOrUpdateFlashcardDto({
          ...originalFlashcard,
          collectionId: this.form?.get(FlashcardFormControlNames.collectionId)?.value,
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
}
