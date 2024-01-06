import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CollectionsComponent } from './collections.component';
import { CollectionsViewActionsComponent } from './collections-view-actions/collections-view-actions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RightColumnComponent } from './right-collumn/right-column.component';
import { AppFormsModule } from '../forms/app-forms.module';
import { CollectionsViewComponent } from './collections-view/collections-view.component';
import { CollectionCardComponent } from './collections-view/collection-card/collection-card.component';
import { AttemptsColumnComponent } from './attempts-column/attempts-column.component';
import { AttemptDetailsComponent } from './attempts-column/attempt-details/attempt-details.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    CollectionsViewActionsComponent,
    RightColumnComponent,
    CollectionsViewComponent,
    CollectionCardComponent,
    AttemptsColumnComponent,
    AttemptDetailsComponent,
  ],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule, ReactiveFormsModule, AppFormsModule],
})
export class CollectionsModule {}
