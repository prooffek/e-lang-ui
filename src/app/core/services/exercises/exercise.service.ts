import { Injectable } from '@angular/core';
import { AnswerDto, ExerciseDto } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  checkSelectExerciseAnswer(exercise: ExerciseDto, selected: AnswerDto[]): boolean {
    const correctValues = exercise.correctAnswers?.map((x) => x.value) ?? [];
    const answerValues = selected.map((x) => x.value) ?? [];

    return (
      !!correctValues.length &&
      !!answerValues.length &&
      exercise?.correctAnswers?.length === selected.length &&
      new Set([...correctValues, ...answerValues]).size === exercise.correctAnswers.length
    );
  }

  checkInputExerciseAnswer(exercise: ExerciseDto, answer: string): boolean {
    const correctAnswer = exercise.wordOrPhrase.toLowerCase();
    answer = answer.trim().toLowerCase();

    return correctAnswer === answer;
  }
}
