import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TabNames } from './core/layout/topbar/tab/topbar-constants';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: TabNames.Collections, component: AppComponent },
  { path: TabNames.Flashcards, component: AppComponent },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
