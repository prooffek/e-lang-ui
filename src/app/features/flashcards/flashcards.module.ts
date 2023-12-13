import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { FlashcardsComponent } from './flashcards.component';
import { FlashcardViewComponent } from './flashcard-view/flashcard-view.component';
import { AppFormsModule } from '../forms/app-forms.module';
import { FlashcardViewActionsComponent } from './flashcard-view-actions/flashcard-view-actions.component';

@NgModule({
  declarations: [FlashcardsComponent, FlashcardViewComponent, FlashcardViewActionsComponent],
  imports: [CommonModule, FlashcardsRoutingModule, SharedModule, AgGridModule, AppFormsModule],
})
export class FlashcardsModule {}
