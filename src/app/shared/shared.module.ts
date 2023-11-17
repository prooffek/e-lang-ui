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
import { InputComponent } from './base-controls/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from './base-controls/input-error/input-error.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteInputComponent } from './base-controls/autocomplete-input/autocomplete-input.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { IconButtonComponent } from './base-controls/icon-button/icon-button.component';

@NgModule({
  declarations: [
    IconComponent,
    CardComponent,
    CollectionsListComponent,
    AddCardComponent,
    CollectionCardComponent,
    ButtonComponent,
    DividerComponent,
    InputComponent,
    InputErrorComponent,
    AutocompleteInputComponent,
    FormContainerComponent,
    IconButtonComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  exports: [
    IconComponent,
    CardComponent,
    CollectionsListComponent,
    AddCardComponent,
    ButtonComponent,
    InputComponent,
    AutocompleteInputComponent,
    FormContainerComponent,
    IconButtonComponent,
  ],
})
export class SharedModule {}
