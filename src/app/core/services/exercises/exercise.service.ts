import { Injectable } from '@angular/core';
import { AnswerDto, ExerciseDto } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  checkAnswer(exercise: ExerciseDto, selected: AnswerDto[]): boolean {
    if (exercise.isSelect) {
      const correctValues = exercise.correctAnswers.map((x) => x.value);
      const answerValues = selected.map((x) => x.value);

      return (
        exercise.correctAnswers.length === selected.length &&
        new Set([...correctValues, ...answerValues]).size === exercise.correctAnswers.length
      );
    }

    return false;
  }
}