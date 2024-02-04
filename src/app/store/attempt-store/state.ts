import { AttemptDto, ExerciseDto } from '../../core/services/api-client/api-client';

export const attemptStoreName = 'attemptStore';

export type AttemptState = {
  attempts: { [collectionId: string]: AttemptDto[] };
  currentAttempt?: AttemptDto;
  currentExercise?: ExerciseDto;
};

export const initialAttemptState: AttemptState = {
  attempts: {},
};
