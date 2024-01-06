import { FlashcardOrder } from '../services/api-client/api-client';

export enum FormType {
  addCollection = 'add-collection',
  editCollection = 'edit-collection',
  addFlashcard = 'add-flashcard',
  editFlashcard = 'edit-flashcard',
  addAttempt = 'add-attempt',
}

export const DefaultCollectionFormValues = {
  id: '',
  name: '',
  parentCollectionId: '',
};

export enum CollectionFormControlNames {
  id = 'id',
  name = 'name',
  parentCollectionId = 'parentCollectionId',
}

export enum ValidationValues {
  collectionNameMinLength = 1,
  collectionNameMaxLength = 120,
  wordOrPhraseMinLength = 1,
  wordOrPhraseMaxLength = 10000,
  meaningMinLength = 1,
  meaningMaxLength = 10000,
}

export const DefaultFlashcardFormValues = {
  collectionId: '',
  flashcardBaseId: '',
  wordOrPhrase: '',
  meaningId: '',
  meaningValue: '',
};

export const FlashcardFormControlNames = {
  flashcardId: 'flashcardId',
  collectionId: 'collectionId',
  flashcardBaseId: 'flashcardBaseId',
  wordOrPhrase: 'wordOrPhrase',
  meanings: 'meanings',
  meaningId: 'id',
  meaningValue: 'value',
};

export enum AttemptFormControlNames {
  name = 'name',
  collectionId = 'collectionId',
  maxFlashcardsPerStage = 'maxFlashcardsPerStage',
  maxQuizzesPerFlashcard = 'maxQuizTypesPerFlashcard',
  minCompletedQuizzesPerCent = 'minCompletedQuizzesPerCent',
  flashcardsOrder = 'order',
  includeMeanings = 'includeMeanings',
}

export const DefaultAttemptFormValues = {
  name: '',
  collectionId: '',
  maxFlashcardsPerStage: 5,
  maxQuizzesPerFlashcard: 3,
  minCompletedQuizzesPerCent: 100,
  flashcardsOrder: FlashcardOrder.AlphabeticalDesc,
  includeMeanings: true,
};
