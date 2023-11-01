import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from './layout/content-wrapper/content-wrapper.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './layout/topbar/breadcrumb/breadcrumb.component';
import { TabComponent } from './layout/topbar/tab/tab.component';

@NgModule({
  declarations: [ContentWrapperComponent, TopbarComponent, BreadcrumbComponent, TabComponent],
  imports: [CommonModule, SharedModule],
  exports: [ContentWrapperComponent, TopbarComponent, TabComponent],
})
export class CoreModule {}
