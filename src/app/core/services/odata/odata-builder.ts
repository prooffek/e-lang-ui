import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class OdataBuilder<T> {
  private _select: string[] = [];
  private _filter: string[] = [];
  private _expand: string[] = [];
  private _top: number | null = null;
  private _skip: number | null = null;
  private _orderBy: string | null = null;
  private _count: boolean = false;

  constructor(
    private _http: HttpClient,
    private _apiUrl: string,
    private _entityName: string,
    private _onMaterialize: (data: any) => T,
  ) {}

  select(select: string): OdataBuilder<T> {
    this._select.push(select);
    return this;
  }

  filter(filter: string): OdataBuilder<T> {
    this._filter.push(filter);
    return this;
  }

  expand(expand: string): OdataBuilder<T> {
    this._expand.push(expand);
    return this;
  }

  orderBy(orderBy: string): OdataBuilder<T> {
    this._orderBy = orderBy;
    return this;
  }

  top(top: number): OdataBuilder<T> {
    this._top = top;
    return this;
  }

  skip(skip: number): OdataBuilder<T> {
    this._skip = skip;
    return this;
  }

  count(count: boolean = true): OdataBuilder<T> {
    this._count = count;
    return this;
  }

  getUrl(): string {
    return this.getQueryUrl();
  }

  exec(): Observable<T> {
    return this._http
      .get<T>(`${this._apiUrl}/api/${this.getUrl()}`)
      .pipe(map((e) => this._onMaterialize.call(this, e)));
  }

  private getQueryUrl(): string {
    var isFirstOperator = true;
    var queryUrl: string = `${this._entityName}`;
    if (this._select?.length) {
      queryUrl += this.addOdataLinker(`$select=${this._select.join(',')}`, isFirstOperator);
      isFirstOperator = false;
    }
    if (this._filter?.length) {
      queryUrl += this.addOdataLinker(`$filter=${this._filter.join(' and ')}`, isFirstOperator);
      isFirstOperator = false;
    }
    if (this._expand?.length) {
      queryUrl += this.addOdataLinker(`$expand=${this._expand.join(',')}`, isFirstOperator);
      isFirstOperator = false;
    }
    if (this._orderBy) {
      queryUrl += this.addOdataLinker(`$orderby=${this._orderBy}`, isFirstOperator);
      isFirstOperator = false;
    }
    if (this._top) {
      queryUrl += this.addOdataLinker(`$top=${this._top}`, isFirstOperator);
      isFirstOperator = false;
    }
    if (this._skip) {
      queryUrl += this.addOdataLinker(`$skip=${this._skip}`, isFirstOperator);
      isFirstOperator = false;
    }
    queryUrl += this.addOdataLinker(`$count=${this._count ? 'true' : 'false'}`, isFirstOperator);

    return queryUrl;
  }

  private addOdataLinker(queryPart: string, isFirstOperator: boolean): string {
    if (isFirstOperator) {
      return `?${queryPart}`;
    } else {
      return `&${queryPart}`;
    }
  }
}
