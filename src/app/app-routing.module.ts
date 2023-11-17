import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' })),
  ],
})
export class AppRoutingModule {}
