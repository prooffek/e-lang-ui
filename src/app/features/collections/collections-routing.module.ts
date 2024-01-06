import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections.component';
import { RightColumnComponent } from './right-collumn/right-column.component';
import { AttemptsColumnComponent } from './right-collumn/attempts-column/attempts-column.component';

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
    component: CollectionsComponent,
    children: [
      {
        path: 'form/:formType',
        component: RightColumnComponent,
      },
    ],
  },
  {
    path: ':columns/collection/:collectionId',
    component: CollectionsComponent,
    children: [
      {
        path: 'form/:formType',
        component: RightColumnComponent,
      },
      {
        path: 'attempts',
        component: AttemptsColumnComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
