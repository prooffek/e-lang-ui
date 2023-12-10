export enum FormType {
  addCollection = 'add-collection',
  editCollection = 'edit-collection',
  addFlashcard = 'add-flashcard',
  editFlashcard = 'edit-flashcard',
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
  collectionId: 'collectionId',
  flashcardBaseId: 'flashcardBaseId',
  wordOrPhrase: 'wordOrPhrase',
  meanings: 'meanings',
  meaningId: 'id',
  meaningValue: 'value',
};
