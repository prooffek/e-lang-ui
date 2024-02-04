import { MeaningDto } from '../../services/api-client/api-client';

export const getMeaningsString = (meanings: MeaningDto[]) => {
  if (!meanings?.length) return '';

  const str = meanings
    .map((meaning, index) => {
      return `${index + 1}. ${meaning.value}`;
    })
    .join('; ');

  return `${str};`;
};
