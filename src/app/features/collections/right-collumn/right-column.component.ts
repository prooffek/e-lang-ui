import { Component, Input } from '@angular/core';
import { FormType } from '../../../core/enums/form-constants';

@Component({
  selector: 'app-right-collumn',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.scss'],
})
export class RightColumnComponent {
  @Input() formType: FormType = FormType.add;
  @Input() collectionId: string = '';
  @Input() editCollectionId: string | undefined = undefined;
}
