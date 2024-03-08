import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExerciseService } from '../../../../../core/services/exercises/exercise.service';
import { AnswerDto, ExerciseDto } from '../../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-multiselect-exercise',
  templateUrl: './multiselect-exercise.component.html',
  styleUrls: ['./multiselect-exercise.component.scss'],
})
export class MultiselectExerciseComponent {
  private readonly _exerciseService = inject(ExerciseService);

  @Input() exercise: ExerciseDto | undefined;
  @Input() meanings: string | undefined;

  @Output() onSelectNext = new EventEmitter<{
    attemptId: string;
    flashcardStateId: string;
    isAnswerCorrect: boolean;
  }>();

  selected: AnswerDto[] = [];
  showAnswer: boolean = false;
  isAnswerCorrect: boolean | undefined;

  checkAnswer() {
    this.showAnswer = true;
    this.isAnswerCorrect = this._exerciseService.checkSelectExerciseAnswer(this.exercise!, this.selected);
  }

  next() {
    if (!this.exercise) return;

    const { attemptId, flashcardStateId } = this.exercise!;

    this.onSelectNext.emit({
      attemptId,
      flashcardStateId,
      isAnswerCorrect: !!this.isAnswerCorrect,
    });

    this.resetValues();
  }

  private resetValues() {
    this.showAnswer = false;
    this.selected = [];
    this.isAnswerCorrect = undefined;
  }
}
