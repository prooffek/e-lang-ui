import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CollectionCardDto } from '../../../core/services/api-client/api-client';
import { Columns } from '../../../core/enums/route-constants';
import { ButtonModel } from '../../../shared/base-controls/button/button.model';
import { ColDef } from 'ag-grid-community';
import { TableButtonComponent } from '../../../shared/components/table/table-button/table-button.component';
import { FlashcardViewModel } from '../../flashcards/flashcard-view/flashcard-view.model';
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
  selector: 'app-collections-view',
  templateUrl: './collections-view.component.html',
  styleUrls: ['./collections-view.component.scss'],
})
export class CollectionsViewComponent {
  private readonly _navigationService = inject(NavigationService);
  protected readonly columnEnum = Columns;

  @Input() collectionCards: CollectionCardDto[] = [];
  @Input() collectionName: string | undefined;
  @Input() columns: string = this.columnEnum.singleColumn;
  @Input() collectionId: string | undefined;
  @Input() showFlashcards = false;
  @Input() flashcards: FlashcardViewModel[] | undefined;

  @Output() onCollectionSelect = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();
  @Output() onSelectedFlashcardsChange = new EventEmitter<FlashcardViewModel[]>();

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

  selectCollection(collectionId: string) {
    this.onCollectionSelect.emit(collectionId);
  }

  removeCollection(collectionId: string) {
    this.onRemove.emit(collectionId);
  }

  editFlashcard(id: string) {
    this._navigationService.navigateToCollectionFlashcardEditForm(id, this.collectionId);
  }

  selectFlashcards(selectedRows: FlashcardViewModel[]) {
    this.onSelectedFlashcardsChange.emit(selectedRows);
  }

  learnCollection(collectionId: string) {
    this._navigationService.navigateToAttempts(collectionId);
  }
}
