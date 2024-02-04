import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ArrayService } from '../../../../../core/services/arrays/array.service';
import { ExerciseService } from '../../../../../core/services/exercises/exercise.service';
import { AnswerDto, ExerciseDto } from '../../../../../core/services/api-client/api-client';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent {
  private readonly _arrayService = inject(ArrayService);
  private readonly _exerciseService = inject(ExerciseService);

  private _exercise: ExerciseDto | undefined;

  protected answers: AnswerDto[] = [];

  @Input() set exercise(value: ExerciseDto | undefined) {
    this._exercise = value;
    this.reset(this.exercise);
  }

  get exercise() {
    return this._exercise;
  }

  @Input() meanings: string | undefined;

  @Output() onSelectNext = new EventEmitter<{
    attemptId: string;
    flashcardStateId: string;
    isAnswerCorrect: boolean;
  }>();

  selected: AnswerDto | undefined;
  isCorrect: boolean = false;
  showAnswer: boolean = false;

  click(exercise: ExerciseDto, answer: AnswerDto) {
    this.selected = answer;
    this.isCorrect = this._exerciseService.checkAnswer(exercise, [this.selected]);
    this.showAnswer = true;
  }

  isCorrectAnswer(answer: AnswerDto): boolean {
    return !!this._exercise?.correctAnswers.map((x) => x.value).includes(answer.value);
  }

  selectNext() {
    const { attemptId, flashcardStateId } = this.exercise!;
    this.onSelectNext.emit({ attemptId, flashcardStateId, isAnswerCorrect: this.isCorrect });
  }

  private reset(exercise?: ExerciseDto) {
    this.selected = undefined;
    this.isCorrect = false;
    this.showAnswer = false;

    if (exercise) {
      this.setAnswers(exercise);
    }
  }

  private setAnswers(exercise: ExerciseDto) {
    const answers = [...exercise.correctAnswers, ...exercise.incorrectAnswers];
    this.answers = this._arrayService.randomize(answers);
  }
}
