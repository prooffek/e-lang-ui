import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() colDef: ColDef[] | undefined;
  @Input() rowData: any[] | undefined;

  themeClass: string =
    "ag-theme-quartz-dark";
}
