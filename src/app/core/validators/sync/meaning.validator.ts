import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorConstants } from '../../enums/validation-error-constants';

export function meaningsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const meaningControls = [...control.value];
    const meanings = meaningControls.map((c) => c.value);

    if (meanings.length && [...new Set(meanings)].length !== meanings.length) {
      return {
        [ValidationErrorConstants.duplicatedMeanings]: toString(getDuplicatedValues(meanings)),
      };
    }

    return null;
  };
}

const toString = (values: string[]) => {
  if (!values.length) {
    return '';
  }

  values = values.map((v) => `'${v}'`);

  if (values.length === 1) {
    return values[0];
  }

  const lastEl = values.pop();

  return values.join(', ') + (lastEl ? ` and ${lastEl}` : '');
};

const getDuplicatedValues = (arr: string[]) => {
  const duplicates: string[] = [];
  const uniqueValues: string[] = [];

  arr.forEach((v) => {
    if (uniqueValues.indexOf(v) < 0) {
      uniqueValues.push(v);
    } else {
      if (duplicates.indexOf(v) < 0) {
        duplicates.push(v);
      }
    }
  });

  return duplicates;
};
