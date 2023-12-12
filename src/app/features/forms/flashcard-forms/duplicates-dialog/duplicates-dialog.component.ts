import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DuplicatedFlashcardData, DuplicatesDialogData } from './duplicates-dialog.model';
import { MeaningDto } from '../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-duplicates-dialog',
  templateUrl: './duplicates-dialog.component.html',
  styleUrls: ['./duplicates-dialog.component.scss'],
})
export class DuplicatesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DuplicatesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DuplicatesDialogData,
  ) {}

  get flashcards() {
    if (!this.data) return;

    return this.data.duplicates.map(
      (f) =>
        ({
          flashcardBaseId: f.flashcardBaseId,
          collectionName: f.collectionName,
          meanings: this.getMeaningsString(f.meanings),
        }) as DuplicatedFlashcardData,
    );
  }

  useExisting(flashcardBaseId: string) {
    const flashcard = this.data.duplicates.find((f) => f.flashcardBaseId === flashcardBaseId);
    this.dialogRef.close(flashcard);
  }

  close() {
    this.dialogRef.close();
  }

  private getMeaningsString(meanings: MeaningDto[]) {
    return meanings
      .map((meaning, index) => {
        return `${index + 1}. ${meaning.value}`;
      })
      .join('; ');
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
