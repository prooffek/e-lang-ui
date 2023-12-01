import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ButtonModel } from 'src/app/shared/base-controls/button/button,model';
import { TableButtonComponent } from 'src/app/shared/components/table/table-button/table-button.component';
import { loadFlashcards } from 'src/app/store/flashcard-store/flashcard-store/actions';
import { selectAllFlashcardModels } from 'src/app/store/flashcard-store/flashcard-store/selectors';
import { State } from 'src/app/store/root-state';

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
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss'],
})
export class FlashcardListComponent {
  private readonly _store = inject(Store<State>);

  buttons: ButtonModel[] = [
    {
      label: 'Edit',
      onClick: (id: string) => this.editFlashcard(id),
      width: '70px',
      height: '30px',
      iconFile: 'edit-black',
    },
    {
      label: 'Remove',
      onClick: (id: string) => this.deleteFlashcard(id),
      width: '70px',
      height: '30px',
      iconFile: 'delete-black',
    },
  ];

  flashcards = this._store.selectSignal(selectAllFlashcardModels);
  colDef: ColDef[] = [
    {
      field: '',
      cellRenderer: TableButtonComponent,
      cellRendererParams: {
        buttons: this.buttons,
        shouldRefresh: false,
      },
      resizable: false,
      width: 200,
    },
    { field: FlashcardColumnNames.wordOrPhrase, headerName: Headers.wordOrPhrase, flex: 1 },
    { field: FlashcardColumnNames.meanings, headerName: Headers.meanings, flex: 2 },
    { field: FlashcardColumnNames.collectionName, headerName: Headers.collection, width: 150 },
    { field: FlashcardColumnNames.createdOn, headerName: Headers.createdOn, resizable: false, width: 150 },
    { field: FlashcardColumnNames.lastSeenOn, resizable: false, headerName: Headers.lastSeenOn, width: 150 },
    { field: FlashcardColumnNames.status, headerName: Headers.status, resizable: false, width: 100 },
  ];

  constructor() {
    this._store.dispatch(loadFlashcards());
  }

  editFlashcard(id: string) {
    console.log({ edit: id });
  }

  deleteFlashcard(id: string) {
    console.log({ delete: id });
  }
}
