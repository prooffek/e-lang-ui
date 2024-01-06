import { inject, Injectable } from '@angular/core';
import { OdataBase } from './odata-base.service';
import { HttpClient } from '@angular/common/http';
import { OdataBuilder } from './odata-builder';
import { AttemptDto } from '../api-client/api-client';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttemptOdataService implements OdataBase {
  private readonly _entityName = 'Attempt';
  private readonly _httpClient = inject(HttpClient);

  query(): OdataBuilder<AttemptDto[]> {
    return new OdataBuilder<AttemptDto[]>(this._httpClient, environment.baseUrl, this._entityName, this.onMaterialize);
  }

  onMaterialize(data: any[]): AttemptDto[] {
    return data.map((value) => AttemptDto.fromJS(value));
  }

  getAttemptsByCollectionId(collectionId: string): Observable<AttemptDto[]> {
    return this.query().filter(`collectionId eq ${collectionId}`).exec();
  }
}
