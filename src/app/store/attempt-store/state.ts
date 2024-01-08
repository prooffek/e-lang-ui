import { AttemptDto } from '../../core/services/api-client/api-client';

export const attemptStoreName = 'attemptStore';

export type AttemptState = {
  attempts: { [collectionId: string]: AttemptDto[] };
  currentAttempt?: AttemptDto;
};

export const initialAttemptState: AttemptState = {
  attempts: {},
};
