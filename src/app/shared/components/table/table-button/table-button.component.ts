import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TableButtonParams } from './table-button-params.model';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.scss'],
})
export class TableButtonComponent implements ICellRendererAngularComp {
  data: (ICellRendererParams<any, any, any> & TableButtonParams) | undefined;

  @Input() shouldRefresh: boolean = false;

  agInit(params: ICellRendererParams<any, any, any> & TableButtonParams): void {
    this.data = params;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return this.shouldRefresh;
  }
}
