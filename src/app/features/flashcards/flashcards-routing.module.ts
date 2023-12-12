import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards.component';
import { EditFlashcardFormComponent } from '../forms/flashcard-forms/edit-flashcard-form/edit-flashcard-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full',
  },
  {
    path: ':columns',
    component: FlashcardsComponent,
    children: [
      {
        path: 'form/:formType',
        component: EditFlashcardFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashcardsRoutingModule {}
