import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconComponent } from './base-controls/icon/icon.component';
import { CardComponent } from './components/card/card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
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
import { TableComponent } from './components/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { TableButtonComponent } from './components/table/table-button/table-button.component';
import { DialogComponent } from './base-controls/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    IconComponent,
    CardComponent,
    AddCardComponent,
    ButtonComponent,
    DividerComponent,
    InputComponent,
    InputErrorComponent,
    AutocompleteInputComponent,
    FormContainerComponent,
    IconButtonComponent,
    TableComponent,
    TableButtonComponent,
    DialogComponent,
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
    AgGridModule,
    MatDialogModule,
  ],
  exports: [
    IconComponent,
    CardComponent,
    AddCardComponent,
    ButtonComponent,
    InputComponent,
    AutocompleteInputComponent,
    FormContainerComponent,
    IconButtonComponent,
    TableComponent,
    TableButtonComponent,
    DialogComponent,
    DividerComponent,
  ],
})
export class SharedModule {}
