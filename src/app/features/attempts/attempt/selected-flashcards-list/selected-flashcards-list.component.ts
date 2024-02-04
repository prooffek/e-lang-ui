import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FlashcardDto } from '../../../../core/services/api-client/api-client';
import { ColDef, RowSpanParams } from 'ag-grid-community';
import { SelectedFlashcard } from './selected-flashcard.model';
import { NavigationService } from '../../../../core/services/router/navigation.service';

export enum ColumnNames {
  index = 'index',
  wordOrPhrase = 'wordOrPhrase',
  meanings = 'meanings',
}

export enum Headers {
  index = 'No',
  wordOrPhrase = 'Word/Phrase',
  meanings = 'Meaning(s)',
}

@Component({
  selector: 'app-selected-flashcards-list',
  templateUrl: './selected-flashcards-list.component.html',
  styleUrls: ['./selected-flashcards-list.component.scss'],
})
export class SelectedFlashcardsListComponent {
  private readonly _navigationService = inject(NavigationService);
  private _flashcards: FlashcardDto[] | undefined;

  @Input() collectionId: string | undefined;
  @Input() set flashcards(value: FlashcardDto[] | undefined) {
    this._flashcards = value;

    if (this._flashcards?.length) {
      this.rowData = this._flashcards
        .map((f, i) => {
          return f.meanings.map((meaning, index) => ({
            index: index === 0 ? i + 1 : undefined,
            wordOrPhrase: index === 0 ? f.wordOrPhrase : '',
            meanings: `${index + 1}. ${meaning.value}`,
            span: index === 0 && f.meanings.length > 1 ? f.meanings.length : 0,
          }));
        })
        .flat();
    }
  }

  @Output() onContinue = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  colDef: ColDef[] = [
    {
      field: ColumnNames.index,
      headerName: Headers.index,
      width: 60,
      rowSpan: this.rowSpan,
    },
    {
      field: ColumnNames.wordOrPhrase,
      headerName: Headers.wordOrPhrase,
      flex: 1,
      minWidth: 250,
      rowSpan: this.rowSpan,
    },
    { field: ColumnNames.meanings, headerName: Headers.meanings, flex: 2, minWidth: 250 },
  ];

  rowData: SelectedFlashcard[] = [];

  rowSpan(params: RowSpanParams) {
    return params.data ? params.data.span : 1;
  }

  continue() {
    this.onContinue.emit();
  }

  cancel() {
    if (this.collectionId) {
      this._navigationService.navigateToSelectedCollectionView(this.collectionId);
    } else {
      this._navigationService.navigateToCollections();
    }
  }
}
