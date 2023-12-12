import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, skipWhile, take, takeUntil, tap } from 'rxjs/operators';
import { FlashcardDto, MeaningDto } from '../../../../core/services/api-client/api-client';
import { DuplicatesDialogData } from '../duplicates-dialog/duplicates-dialog.model';
import { FlashcardOdataService } from '../../../../core/services/odata/flashcard-odata.service';
import { SubscribedContainer } from '../../../../core/base/subscribed.container';
import { DuplicatesDialogComponent } from '../duplicates-dialog/duplicates-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DefaultFlashcardFormValues } from '../../../../core/enums/form-constants';

@Component({
  selector: 'app-word-or-phrase-input',
  templateUrl: './word-or-phrase-input.component.html',
  styleUrls: ['./word-or-phrase-input.component.scss'],
})
export class WordOrPhraseInputComponent extends SubscribedContainer {
  private readonly _flashcardOdataService = inject(FlashcardOdataService);
  private readonly _dialog = inject(MatDialog);

  protected readonly defaultValue = DefaultFlashcardFormValues.wordOrPhrase;

  @Input() control: FormControl | undefined;
  @Input() isExistingFlashcardUsed = false;

  @Output() markFormAsPristine = new EventEmitter();
  @Output() onDuplicated = new EventEmitter<{ meanings: MeaningDto[]; flashcardBaseId: string }>();

  handleDuplicates() {
    const wordOrPhrase = this.control?.value as string;

    if (wordOrPhrase && this.control?.dirty) {
      this._flashcardOdataService
        .getDuplicatesByWordOrPhrase(wordOrPhrase)
        .pipe(
          takeUntil(this.destroyed$),
          skipWhile((value: FlashcardDto[]) => !value.length),
          take(1),
          map(
            (duplicates) =>
              ({
                wordOrPhrase,
                duplicates,
              }) as DuplicatesDialogData,
          ),
          tap((data) => this.openDuplicatedDialog(data)),
        )
        .subscribe();
    }
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
            this.isExistingFlashcardUsed = true;
            this.markFormAsPristine.emit();
          }
        }),
      )
      .subscribe();
  }

  private setValuesFromFlashcardBase(flashcard: FlashcardDto) {
    if (flashcard?.meanings?.length) {
      this.onDuplicated.emit({
        meanings: flashcard.meanings,
        flashcardBaseId: flashcard.flashcardBaseId,
      });
      this.control?.markAsPristine();
    }
  }
}
