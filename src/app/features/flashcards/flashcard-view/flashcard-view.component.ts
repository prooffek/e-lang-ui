import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ButtonModel } from 'src/app/shared/base-controls/button/button.model';
import { TableButtonComponent } from 'src/app/shared/components/table/table-button/table-button.component';
import { FlashcardViewModel } from './flashcard-view.model';
import { NavigationService } from '../../../core/services/router/navigation.service';

export enum FlashcardColumnNames {
  collectionName = 'collectionName',
  wordOrPhrase = 'wordOrPhrase',
  meanings = 'meanings',
  createdOn = 'createdOn',
  lastSeenOn = 'lastSeenOn',
  status = 'status',
}

export enum Headers {
  collection = 'Collection',
  wordOrPhrase = 'Word/Phrase',
  meanings = 'Meaning(s)',
  createdOn = 'Created on',
  lastSeenOn = 'Last seen on',
  status = 'Status',
}

@Component({
  selector: 'app-flashcard-view',
  templateUrl: './flashcard-view.component.html',
  styleUrls: ['./flashcard-view.component.scss'],
})
export class FlashcardViewComponent {
  private readonly _navigationService = inject(NavigationService);

  @Input() flashcards: FlashcardViewModel[] = [];

  @Output() onSelectedChange = new EventEmitter<FlashcardViewModel[]>();

  buttons: ButtonModel[] = [
    {
      label: 'Edit',
      onClick: (id: string) => this.editFlashcard(id),
      width: '70px',
      height: '30px',
      iconFile: 'edit-black',
    },
  ];

  colDef: ColDef[] = [
    {
      field: '',
      cellRenderer: TableButtonComponent,
      cellRendererParams: {
        buttons: this.buttons,
        shouldRefresh: false,
      },
      resizable: false,
      width: 80,
    },
    { field: FlashcardColumnNames.wordOrPhrase, headerName: Headers.wordOrPhrase, flex: 1, minWidth: 250 },
    { field: FlashcardColumnNames.meanings, headerName: Headers.meanings, flex: 2, minWidth: 250 },
    { field: FlashcardColumnNames.collectionName, headerName: Headers.collection, width: 150 },
    { field: FlashcardColumnNames.createdOn, headerName: Headers.createdOn, resizable: false, width: 150 },
    { field: FlashcardColumnNames.lastSeenOn, resizable: false, headerName: Headers.lastSeenOn, width: 150 },
    { field: FlashcardColumnNames.status, headerName: Headers.status, resizable: false, width: 100 },
  ];

  editFlashcard(id: string) {
    this._navigationService.navigateToFlashcardEditForm(id);
  }

  select(selectedRows: FlashcardViewModel[]) {
    this.onSelectedChange.emit(selectedRows);
  }
}
