import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FlashcardListComponent } from './flashcard-list/flashcard-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FlashcardListComponent],
  imports: [CommonModule, FlashcardsRoutingModule, SharedModule],
})
export class FlashcardsModule {}
