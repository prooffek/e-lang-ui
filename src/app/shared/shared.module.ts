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
import { DropdownComponent } from './base-controls/dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxComponent } from './base-controls/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { SelectExerciseComponent } from './components/exercise/select-exercise/select-exercise.component';
import { ExerciseResultComponent } from './components/exercise/exercise-result/exercise-result.component';
import { ExerciseFlashcardContentComponent } from './components/exercise/exercise-flashcard-content/exercise-flashcard-content.component';

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
    DropdownComponent,
    CheckboxComponent,
    ExerciseComponent,
    SelectExerciseComponent,
    ExerciseResultComponent,
    ExerciseFlashcardContentComponent,
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
    MatSelectModule,
    MatCheckboxModule,
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
    DropdownComponent,
    CheckboxComponent,
    ExerciseComponent,
    SelectExerciseComponent,
    ExerciseResultComponent,
    ExerciseFlashcardContentComponent,
  ],
})
export class SharedModule {}
