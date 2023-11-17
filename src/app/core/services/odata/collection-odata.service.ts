import { inject, Injectable } from '@angular/core';
import { OdataBase } from './odata-base.service';
import { OdataBuilder } from './odata-builder';
import { CollectionCardDto } from '../api-client/api-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionOdataService implements OdataBase {
  private readonly _entityName = 'Collection';
  private readonly _httpClient = inject(HttpClient);

  query(): OdataBuilder<CollectionCardDto[]> {
    return new OdataBuilder<CollectionCardDto[]>(
      this._httpClient,
      environment.baseUrl,
      this._entityName,
      this.onMaterialize,
    );
  }

  onMaterialize(data: any[]): CollectionCardDto[] {
    return data.map((value) => CollectionCardDto.fromJS(value));
  }
}
