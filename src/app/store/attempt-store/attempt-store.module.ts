import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { attemptStoreName } from './state';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(attemptStoreName, Reducer), EffectsModule.forFeature([Effects])],
})
export class AttemptStoreModule {}
