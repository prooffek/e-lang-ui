import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.scss'],
})
export class ExerciseResultComponent {
  @Input() showAnswer: boolean | undefined;
  @Input() isCorrect: boolean | undefined;
}
