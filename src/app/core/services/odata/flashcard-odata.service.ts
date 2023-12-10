import { Injectable, inject } from '@angular/core';
import { OdataBase } from './odata-base.service';
import { OdataBuilder } from './odata-builder';
import { FlashcardDto } from '../api-client/api-client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardOdataService implements OdataBase {
  private readonly _httpClient = inject(HttpClient);
  private readonly _entityName = 'Flashcard';

  query(): OdataBuilder<any> {
    return new OdataBuilder<FlashcardDto[]>(
      this._httpClient,
      environment.baseUrl,
      this._entityName,
      this.onMaterialize,
    );
  }

  onMaterialize(data: any[]) {
    return data.map((value) => FlashcardDto.fromJS(value));
  }

  getDuplicatesByWordOrPhrase(wordOrPhrase: string): Observable<FlashcardDto[]> {
    if (!wordOrPhrase) return of([]);

    return this.query().filter(`tolower(WordOrPhrase) eq tolower('${wordOrPhrase}')`).exec();
  }

  getByFlashcardBaseId(flashcardBaseId: string): Observable<FlashcardDto[]> {
    return this.query().filter(`flashcardBaseId eq ${flashcardBaseId}`).exec();
  }
}
