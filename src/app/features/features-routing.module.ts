import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabName } from '../core/enums/topbar-constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${TabName.collections}/1`,
    pathMatch: 'full',
  },
  {
    path: TabName.collections,
    loadChildren: () => import('./collections/collections.module').then((m) => m.CollectionsModule),
  },
  {
    path: TabName.flashcards,
    loadChildren: () => import('./flashcards/flashcards.module').then((m) => m.FlashcardsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
