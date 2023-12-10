import { ButtonModel } from 'src/app/shared/base-controls/button/button.model';

export interface TableButtonParams {
  buttons: ButtonModel[];
  shouldRefresh?: boolean;
  clicked: any;
}
