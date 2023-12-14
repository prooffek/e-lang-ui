import { Component, inject, Input, OnInit } from '@angular/core';
import { FormType } from '../../../core/enums/form-constants';
import { NavigationBuilder } from '../../../core/builders/route/navigation-builder';

@Component({
  selector: 'app-right-collumn',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.scss'],
})
export class RightColumnComponent implements OnInit {
  private readonly _navBuilder = inject(NavigationBuilder);

  protected readonly formTypeEnum = FormType;

  @Input() formType: FormType = FormType.addCollection;
  @Input() collectionId: string = '';
  @Input() editCollectionId: string | undefined = undefined;
  @Input() editFlashcardId: string | undefined = undefined;

  closeUrlData: { commands: string[]; queryParams: { [key: string]: any } | undefined } | undefined;

  ngOnInit(): void {
    this.closeUrlData = this._navBuilder
      .setCollectionTab()
      .setSingleColumnView()
      .setCollectionView(this.collectionId)
      .build();
  }
}
