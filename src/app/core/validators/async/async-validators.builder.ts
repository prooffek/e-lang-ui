import { OdataBase } from '../../services/odata/odata-base.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionCardDto } from '../../services/api-client/api-client';
import { ValidationErrorAttribute, ValidationErrorConstants } from '../../enums/validation-error-constants';
import { computed, inject, Injectable } from '@angular/core';
import { FormStore } from '../../../stores/form-store/store';

@Injectable({ providedIn: 'root' })
export class AsyncValidatorsBuilder {
  private readonly _formStore = inject(FormStore);

  createValueInUseValidator(odataService: OdataBase, attribute: string, collectionId?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const query = odataService.query();
      query.filter(
        `tolower(${attribute}) eq '${control.value.toLowerCase()}'${collectionId ? ` and id ne ${collectionId}` : ''}`,
      );
      return query.exec().pipe(
        map((response: CollectionCardDto[]) => !!response.length),
        map((isUsed) => {
          return isUsed
            ? {
                [ValidationErrorConstants.valueInUse]: {
                  [ValidationErrorAttribute.attribute]: attribute,
                  [ValidationErrorAttribute.value]: control.value,
                },
              }
            : null;
        }),
      );
    };
  }

  createRecordExistsValidator(odataService: OdataBase, shouldExist: boolean) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      const options = this._formStore.getCollectionAutocompleteData;
      const option = computed(() => options().find((o) => o.name.toLowerCase() === control.value.toLowerCase()));

      if (!this.isValidGuid(control.value) && option()) {
        control.setValue(option()?.id);
      }

      const errorKey = shouldExist ? ValidationErrorConstants.recordNotFound : ValidationErrorConstants.recordExists;
      const error = { [errorKey]: { [ValidationErrorAttribute.id]: control.value } };

      if (!this.isValidGuid(control.value)) {
        return of(error);
      }

      const query = odataService.query();
      query.filter(`id eq ${control.value}`);
      return query.exec().pipe(
        map((response: CollectionCardDto[]) => !!response.length),
        map((response) => {
          if (response === shouldExist) return null;

          return error;
        }),
      );
    };
  }

  private isValidGuid(value: string): boolean {
    return /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/.test(
      value,
    );
  }
}
