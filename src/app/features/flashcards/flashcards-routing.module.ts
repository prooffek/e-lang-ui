import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '1/main',
    pathMatch: 'full',
  },
  {
    path: ':columns',
    redirectTo: ':columns/main',
    pathMatch: 'full',
  },
  {
    path: ':columns/main',
    component: FlashcardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashcardsRoutingModule {}
