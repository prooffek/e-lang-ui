import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCollectionFormComponent } from './collection-form/add-collection-form/add-collection-form.component';
import { EditCollectionFormComponent } from './collection-form/edit-collection-form/edit-collection-form.component';
import { AddFlashcardFormComponent } from './flashcard-forms/add-flashcard/add-flashcard-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DuplicatesDialogComponent } from './flashcard-forms/duplicates-dialog/duplicates-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlashcardModifiedDialogComponent } from './flashcard-forms/flashcard-modified-dialog/flashcard-modified-dialog.component';

@NgModule({
  declarations: [
    AddCollectionFormComponent,
    EditCollectionFormComponent,
    AddFlashcardFormComponent,
    DuplicatesDialogComponent,
    FlashcardModifiedDialogComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [AddCollectionFormComponent, EditCollectionFormComponent, AddFlashcardFormComponent],
})
export class AppFormsModule {}
