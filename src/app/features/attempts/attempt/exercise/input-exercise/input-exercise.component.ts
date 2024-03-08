import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ExerciseDto } from '../../../../../core/services/api-client/api-client';
import { FormBuilder, Validators } from '@angular/forms';
import { ExerciseService } from '../../../../../core/services/exercises/exercise.service';

@Component({
  selector: 'app-input-exercise',
  templateUrl: './input-exercise.component.html',
  styleUrls: ['./input-exercise.component.scss'],
})
export class InputExerciseComponent {
  private _formBuilder = inject(FormBuilder);
  private _exerciseService = inject(ExerciseService);

  private readonly minLength = 1;
  private readonly maxLength = 10000;

  protected readonly controlName = 'userInput';

  @Input() exercise: ExerciseDto | undefined;
  @Input() showAnswer: boolean | undefined;
  @Input() meanings: string | undefined;

  @Output() onSelectNext = new EventEmitter<{
    attemptId: string;
    flashcardStateId: string;
    isAnswerCorrect: boolean;
  }>();

  isCorrect: boolean | undefined;

  form = this._formBuilder.group({
    [this.controlName]: [
      '',
      [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)],
    ],
  });

  checkAnswer() {
    if (this.exercise && this.form.valid) {
      const answer = this.form.get(this.controlName)?.value;
      this.isCorrect = this._exerciseService.checkInputExerciseAnswer(this.exercise, answer ?? '');
      this.showAnswer = true;
    }
  }

  selectNext() {
    if (!this.exercise) return;
    const { attemptId, flashcardStateId } = this.exercise;

    this.onSelectNext.emit({
      attemptId,
      flashcardStateId,
      isAnswerCorrect: !!this.isCorrect,
    });

    this.resetValues();
  }

  resetValues() {
    this.isCorrect = undefined;
    this.form.reset();
    this.showAnswer = undefined;
  }
}
