import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttemptComponent } from './attempt/attempt.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
  {
    path: '1/attempt/:attemptId',
    component: AttemptComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttemptsRoutingModule {}
