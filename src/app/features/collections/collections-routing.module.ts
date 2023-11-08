import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCollectionsViewComponent } from './user-collections-view/user-collections-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserCollectionsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
