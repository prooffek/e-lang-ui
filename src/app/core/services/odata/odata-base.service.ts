import { OdataBuilder } from './odata-builder';

export interface OdataBase {
  query(): OdataBuilder<any>;

  onMaterialize(data: any): any;
}
