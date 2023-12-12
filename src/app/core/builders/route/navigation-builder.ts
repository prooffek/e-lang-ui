import { TabName } from '../../enums/topbar-constants';
import { FormType } from '../../enums/form-constants';
import { Columns, NavigationParams, ViewParams } from '../../enums/route-constants';
import { Injectable } from '@angular/core';

export interface UrlParams {
  tabName: TabName;
  columnsNumber: string;
  view: string[];
  formType: string[] | undefined;
  queryParams: { [key: string]: any } | undefined;
}

export const initUrlParams: UrlParams = {
  tabName: TabName.collections,
  columnsNumber: Columns.singleColumn,
  view: [],
  formType: undefined,
  queryParams: undefined,
};

@Injectable({ providedIn: 'root' })
export class NavigationBuilder {
  private _params: UrlParams = { ...initUrlParams };

  setCollectionTab() {
    this.setTabName(TabName.collections);
    return this;
  }

  setFlashcardsTab() {
    this.setTabName(TabName.flashcards);
    return this;
  }

  setSingleColumnView() {
    this.setColumns(Columns.singleColumn);
    return this;
  }

  setDoubleColumnView() {
    this.setColumns(Columns.doubleColumn);
    return this;
  }

  setMainView() {
    this.setView(ViewParams.main);
    return this;
  }

  setCollectionView(id?: string) {
    if (!id) {
      this.setMainView();
    } else {
      this.setView(ViewParams.collection, id);
    }

    return this;
  }

  setAddCollectionForm() {
    this.setForm(FormType.addCollection);
    return this;
  }

  setCollectionEditForm(collectionId: string) {
    this.setForm(FormType.editCollection, { [NavigationParams.editCollectionId]: collectionId });
    return this;
  }

  setAddFlashcardForm() {
    this.setForm(FormType.addFlashcard);
    return this;
  }

  setFlashcardEditForm(flashcardId: string) {
    this.setForm(FormType.editFlashcard, { [NavigationParams.editFlashcardId]: flashcardId });
    return this;
  }

  build() {
    const navData = {
      commands: [
        this._params.tabName,
        this._params.columnsNumber,
        ...this._params.view,
        ...(this._params.formType ?? ''),
      ],
      queryParams: this._params.queryParams,
    };

    this._params = { ...initUrlParams };

    return navData;
  }

  private setTabName(tabName: TabName) {
    this._params.tabName = tabName;
  }

  private setColumns(number: string) {
    this._params.columnsNumber = number;
  }

  private setView(view: ViewParams, id?: string) {
    switch (view) {
      case ViewParams.main:
        this._params.view = [ViewParams.main];
        return;
      case ViewParams.collection:
        if (!id) return;
        this._params.view = [ViewParams.collection, id];
        return;
      default:
        this._params.view = [ViewParams.main];
        return;
    }
  }

  private setForm(formType: FormType, queryParams?: { [key: string]: any }) {
    this._params.formType = [NavigationParams.form, formType];

    if (queryParams) {
      this._params.queryParams = queryParams;
    }
  }
}
