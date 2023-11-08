import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardListComponent } from './flashcard-list/flashcard-list.component';

const routes: Routes = [
  {
    path: '',
    component: FlashcardListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashcardsRoutingModule {}
