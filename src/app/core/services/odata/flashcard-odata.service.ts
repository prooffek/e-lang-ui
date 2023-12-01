import { Injectable, inject } from '@angular/core';
import { OdataBase } from './odata-base.service';
import { OdataBuilder } from './odata-builder';
import { CollectionCardDto } from '../api-client/api-client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashcardOdataService implements OdataBase {
  private readonly _httpClient = inject(HttpClient);
  private readonly _entityName = "Flashcard";


  query(): OdataBuilder<any> {
    return new OdataBuilder<CollectionCardDto[]>(
      this._httpClient,
      environment.baseUrl,
      this._entityName,
      this.onMaterialize,
    );
  }

  onMaterialize(data: any[]) {
    return data.map((value) => CollectionCardDto.fromJS(value));
  }

}
