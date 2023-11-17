import { Signal } from '@angular/core';

export interface ValidationStore {
  getIdFromAutocomplete(value: string): Signal<string | null>;
}
