import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttemptsRoutingModule } from './attempts-routing.module';
import { AttemptComponent } from './attempt/attempt.component';
import { SelectedFlashcardsListComponent } from './attempt/selected-flashcards-list/selected-flashcards-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AttemptComponent, SelectedFlashcardsListComponent],
  imports: [CommonModule, AttemptsRoutingModule, SharedModule],
})
export class AttemptsModule {}
