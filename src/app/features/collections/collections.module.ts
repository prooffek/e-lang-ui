import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserCollectionsViewComponent } from './user-collections-view/user-collections-view.component';
import { CollectionsViewActionsComponent } from './user-collections-view/collections-view-actions/collections-view-actions.component';

@NgModule({
  declarations: [UserCollectionsViewComponent, CollectionsViewActionsComponent],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule],
})
export class CollectionsModule {}
