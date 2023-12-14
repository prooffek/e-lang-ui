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
import { EditFlashcardFormComponent } from './flashcard-forms/edit-flashcard-form/edit-flashcard-form.component';
import { WordOrPhraseInputComponent } from './flashcard-forms/word-or-phrase-input/word-or-phrase-input.component';
import { MeaningInputsComponent } from './flashcard-forms/meaning-inputs/meaning-inputs.component';
import { SaveFlashcardButtonComponent } from './flashcard-forms/save-button/save-flashcard-button.component';

@NgModule({
  declarations: [
    AddCollectionFormComponent,
    EditCollectionFormComponent,
    AddFlashcardFormComponent,
    DuplicatesDialogComponent,
    FlashcardModifiedDialogComponent,
    EditFlashcardFormComponent,
    WordOrPhraseInputComponent,
    MeaningInputsComponent,
    SaveFlashcardButtonComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [
    AddCollectionFormComponent,
    EditCollectionFormComponent,
    AddFlashcardFormComponent,
    EditFlashcardFormComponent,
  ],
})
export class AppFormsModule {}
