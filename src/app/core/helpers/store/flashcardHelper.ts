import { MeaningDto } from '../../services/api-client/api-client';

export const getMeaningsString = (meanings: MeaningDto[]) => {
  return meanings
    .map((meaning, index) => {
      return `${index + 1}. ${meaning.value}`;
    })
    .join('; ');
};
