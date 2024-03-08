import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ArrayService } from '../../../core/services/arrays/array.service';
import { AnswerDto, ExerciseDto } from '../../../core/services/api-client/api-client';
import { SelectAnswerModel } from './selectAnswerModel';

@Component({
  selector: 'app-select-exercise',
  templateUrl: './select-exercise.component.html',
  styleUrls: ['./select-exercise.component.scss'],
})
export class SelectExerciseComponent {
  private readonly _arrayService = inject(ArrayService);

  private _exercise: ExerciseDto | undefined;
  private _showAnswer: boolean = false;

  protected answers: SelectAnswerModel[] = [];

  @Input() set exercise(value: ExerciseDto | undefined) {
    this._exercise = value;
    this.setAnswers(this.exercise);
  }
  get exercise() {
    return this._exercise;
  }

  @Input() meanings: string | undefined;
  @Input() set showAnswer(value: boolean) {
    this._showAnswer = value;
  }

  get showAnswer() {
    return this._showAnswer;
  }

  @Input() isCorrect: boolean | undefined;
  @Input() selected: AnswerDto[] = [];
  @Output() selectedChange = new EventEmitter<AnswerDto[]>();

  click(answer: SelectAnswerModel) {
    answer.isSelected = !answer.isSelected;
    this.selected = this.answers.filter((x) => x.isSelected).map((x) => ({ value: x.value }) as AnswerDto);
    this.selectedChange.emit(this.selected);
  }

  private setAnswers(exercise: ExerciseDto | undefined) {
    if (!exercise) {
      this.answers = [];
    }

    const correctAnswers = exercise!.correctAnswers.map(
      (x) => ({ value: x.value, isCorrect: true }) as SelectAnswerModel,
    );
    const incorrectAnswers = exercise!.incorrectAnswers.map(
      (x) => ({ value: x.value, isCorrect: false }) as SelectAnswerModel,
    );
    const answers = [...correctAnswers, ...incorrectAnswers];
    this.answers = this._arrayService.randomize(answers);
  }
}
