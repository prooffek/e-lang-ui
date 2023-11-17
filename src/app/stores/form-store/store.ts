import { inject, Injectable, Signal } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormState, initialFormState } from './state';
import { map, switchMap } from 'rxjs/operators';
import { CollectionAutocompleteDto, CollectionClient } from '../../core/services/api-client/api-client';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AutocompleteOption } from '../../shared/base-controls/autocomplete-input/autocomplete.models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class FormStore extends ComponentStore<FormState> {
  private readonly _collectionClient = inject(CollectionClient);

  constructor() {
    super(initialFormState);
  }

  // Selectors
  getCollectionAutocompleteData = this.selectSignal((state) => state.collectionAutocompleteData);

  getFilteredOptions = (control: FormControl, options: Signal<AutocompleteOption[]>) => {
    const options$ = control.valueChanges.pipe(
      map((value: any) => (value ? value.toLowerCase() : value)),
      map((value: string) => {
        if (!value) {
          return options();
        }

        const option = options().find((o) => o.id === value);

        return options().filter(
          (o) => o.name.toLowerCase().includes(value) || (option && o.name.includes(option?.name)),
        );
      }),
    );

    return toSignal(options$);
  };

  // Updates
  addCollectionAutocompleteOption = this.updater((state: FormState, option: AutocompleteOption) => ({
    ...state,
    collectionAutocompleteData: [...state.collectionAutocompleteData, option],
  }));

  // Effects
  loadCollectionAutocompleteData = this.effect((trigger$: Observable<void>) => {
    if (this.getCollectionAutocompleteData().length > 0) return of();

    return trigger$.pipe(
      switchMap(() =>
        this._collectionClient.getCollectionAutocompleteData().pipe(
          tapResponse({
            next: (data: CollectionAutocompleteDto[]) => this.patchState({ collectionAutocompleteData: data }),
            error: (error) => console.error(error),
          }),
        ),
      ),
    );
  });
}
