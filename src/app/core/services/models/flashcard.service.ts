import { Injectable } from '@angular/core';
import { AddOrUpdateFlashcardDto, AddOrUpdateMeaningDto, FlashcardDto } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  getAddOrUpdateFlashcardDto(flashcard: {
    flashcardId?: string;
    wordOrPhrase: string;
    collectionId: string;
    meanings: { id?: string; value: string }[];
    flashcardBaseId?: string;
  }) {
    const { flashcardId, wordOrPhrase, collectionId, meanings, flashcardBaseId } = flashcard;

    const meaningDtos = meanings
      .filter((m) => !!m.value)
      .map(
        (m) =>
          ({
            id: m.id || null,
            value: m.value,
          }) as AddOrUpdateMeaningDto,
      );

    return {
      flashcardId,
      wordOrPhrase,
      flashcardBaseId,
      collectionId,
      meanings: meaningDtos,
    } as AddOrUpdateFlashcardDto;
  }

  areFlashcardsEqual(flashcard1: FlashcardDto, flashcard2: AddOrUpdateFlashcardDto) {
    const meanings1 = flashcard1.meanings.sort((a, b) => a.value.localeCompare(b.value));
    const meanings2 = flashcard2.meanings.sort((a, b) => a.value.localeCompare(b.value));

    if (flashcard1.wordOrPhrase.toLowerCase() === flashcard2.wordOrPhrase.toLowerCase()) {
      return (
        meanings1.length === meanings2.length &&
        !meanings1.filter((meaning, index) => {
          return meaning.id !== meanings2[index].id || meaning.value !== meanings2[index].value;
        }).length
      );
    }

    return false;
  }
}
