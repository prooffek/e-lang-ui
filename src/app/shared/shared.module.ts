import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconComponent } from './base-controls/icon/icon.component';
import { CardComponent } from './components/card/card.component';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CollectionCardComponent } from './components/collections-list/collection-card/collection-card.component';
import { ButtonComponent } from './base-controls/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DividerComponent } from './base-controls/divider/divider.component';

@NgModule({
  declarations: [
    IconComponent,
    CardComponent,
    CollectionsListComponent,
    AddCardComponent,
    CollectionCardComponent,
    ButtonComponent,
    DividerComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, MatButtonModule, MatIconModule, HttpClientModule],
  exports: [IconComponent, CardComponent, CollectionsListComponent, AddCardComponent, ButtonComponent],
})
export class SharedModule {}
