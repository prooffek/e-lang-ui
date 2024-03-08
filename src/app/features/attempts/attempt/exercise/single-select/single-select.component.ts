import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExerciseService } from '../../../../../core/services/exercises/exercise.service';
import { AnswerDto, ExerciseDto } from '../../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent {
  private readonly _exerciseService = inject(ExerciseService);

  @Input() exercise: ExerciseDto | undefined;
  @Input() meanings: string | undefined;

  @Output() onSelectNext = new EventEmitter<{
    attemptId: string;
    flashcardStateId: string;
    isAnswerCorrect: boolean;
  }>();

  selected: AnswerDto[] = [];
  isAnswerCorrect: boolean | undefined;

  get showAnswer() {
    const showAnswer = !!this.selected.length;

    if (showAnswer) {
      this.isAnswerCorrect = this._exerciseService.checkSelectExerciseAnswer(this.exercise!, this.selected);
    }

    return showAnswer;
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

  resetValues() {
    this.selected = [];
    this.isAnswerCorrect = undefined;
  }
}
