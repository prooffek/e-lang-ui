import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { collectionStoreName } from './state';
import { Reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(collectionStoreName, Reducer),
    EffectsModule.forFeature([Effects])
  ]
})
export class CollectionStoreModule { }
