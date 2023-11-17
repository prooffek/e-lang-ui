export enum FormType {
  add = 'add',
  edit = 'edit',
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
}
