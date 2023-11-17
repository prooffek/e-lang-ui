import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CollectionsComponent } from './collections.component';
import { CollectionsViewActionsComponent } from './collections-view-actions/collections-view-actions.component';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RightColumnComponent } from './right-collumn/right-column.component';
import { AddCollectionFormComponent } from './collection-form/add-collection-form/add-collection-form.component';
import { EditCollectionFormComponent } from './collection-form/edit-collection-form/edit-collection-form.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    CollectionsViewActionsComponent,
    CollectionFormComponent,
    RightColumnComponent,
    AddCollectionFormComponent,
    EditCollectionFormComponent,
  ],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CollectionsModule {}
