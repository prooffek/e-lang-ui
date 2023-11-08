import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabNames } from '../core/layout/topbar/tab/topbar-constants';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./collections/collections.module').then((m) => m.CollectionsModule),
  },
  {
    path: TabNames.Collections,
    loadChildren: () => import('./collections/collections.module').then((m) => m.CollectionsModule),
  },
  {
    path: TabNames.Flashcards,
    loadChildren: () => import('./flashcards/flashcards.module').then((m) => m.FlashcardsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
