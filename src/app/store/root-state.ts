import { CollectionState } from "./collection-store/state";
import { FlashcardState } from "./flashcard-store/flashcard-store/state";

export interface State {
    collections: CollectionState,
    flashcards: FlashcardState
}