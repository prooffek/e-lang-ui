import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlashcardDto } from '../../../../core/services/api-client/api-client';
import { FormActions } from '../../../../core/enums/actions';

@Component({
  selector: 'app-flashcard-modified-dialog',
  templateUrl: './flashcard-modified-dialog.component.html',
  styleUrls: ['./flashcard-modified-dialog.component.scss'],
})
export class FlashcardModifiedDialogComponent {
  protected readonly actions = FormActions;

  constructor(
    public dialogRef: MatDialogRef<FlashcardModifiedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlashcardDto[],
  ) {}

  close(action: FormActions) {
    this.dialogRef.close(action);
  }
}
