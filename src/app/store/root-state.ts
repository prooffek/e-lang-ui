import { CollectionState } from './collection-store/state';
import { FlashcardState } from './flashcard-store/flashcard-store/state';
import { AttemptState } from './attempt-store/state';

export interface State {
  collections: CollectionState;
  flashcards: FlashcardState;
  attempts: AttemptState;
}
