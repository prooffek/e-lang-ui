import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttemptsRoutingModule } from './attempts-routing.module';
import { AttemptComponent } from './attempt/attempt.component';
import { SelectedFlashcardsListComponent } from './attempt/selected-flashcards-list/selected-flashcards-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SingleSelectComponent } from './attempt/exercise/single-select/single-select.component';
import { MultiselectExerciseComponent } from './attempt/exercise/multiselect-exercise/multiselect-exercise.component';
import { InputExerciseComponent } from './attempt/exercise/input-exercise/input-exercise.component';

@NgModule({
  declarations: [AttemptComponent, SelectedFlashcardsListComponent, SingleSelectComponent, MultiselectExerciseComponent, InputExerciseComponent],
  imports: [CommonModule, AttemptsRoutingModule, SharedModule],
})
export class AttemptsModule {}
