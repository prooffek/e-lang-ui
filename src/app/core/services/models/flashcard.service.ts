import { Injectable } from '@angular/core';
import { AddOrUpdateFlashcardDto, AddOrUpdateMeaningDto } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  getAddOrUpdateFlashcardDto(flashcard: {
    wordOrPhrase: string;
    collectionId: string;
    meanings: { id?: string; value: string }[];
    flashcardBaseId?: string;
  }) {
    const { wordOrPhrase, collectionId, meanings, flashcardBaseId } = flashcard;

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
      wordOrPhrase,
      flashcardBaseId,
      collectionId,
      meanings: meaningDtos,
    } as AddOrUpdateFlashcardDto;
  }
}
