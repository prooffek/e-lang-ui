import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-flashcard-content',
  templateUrl: './exercise-flashcard-content.component.html',
  styleUrls: ['./exercise-flashcard-content.component.scss'],
})
export class ExerciseFlashcardContentComponent {
  @Input() mainLine: string | undefined;
  @Input() correctAnswer: string | undefined;
  @Input() showAnswer: boolean | undefined;
}
