import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CollectionStoreModule } from './collection-store/collection-store.module';
import { FlashcardStoreModule } from './flashcard-store/flashcard-store/flashcard-store.module';
import { AttemptStoreModule } from './attempt-store/attempt-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CollectionStoreModule,
    FlashcardStoreModule,
    AttemptStoreModule,
  ],
})
export class RootStoreModule {}
