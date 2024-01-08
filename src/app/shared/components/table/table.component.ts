import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  private gridApi!: GridApi<any>;

  @Input() colDef: ColDef[] | undefined;
  @Input() rowData: any[] | undefined;
  @Input() rowSelection: 'single' | 'multiple' = 'single';
  @Input() suppressRowTransform = false;

  @Output() onSelectedChange = new EventEmitter<any[]>();

  themeClass: string = 'ag-theme-quartz-dark';

  selectRows() {
    const selected = this.gridApi.getSelectedRows();
    this.onSelectedChange.emit(selected);
  }

  onGridReady(params: GridReadyEvent<any[]>) {
    this.gridApi = params.api;
  }
}
