import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TabName } from '../../enums/topbar-constants';
import { NavigationBuilder } from '../../builders/route/navigation-builder';

export interface Route {
  FirstChild: any;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _route = inject(Router);
  private _navBuilder = inject(NavigationBuilder);

  navigateTo(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    this._route.navigateByUrl(path);
  }

  navigateHome() {
    this.navigateTo('/');
  }

  navigateToCollections() {
    this.navigateTo(TabName.collections);
  }

  navigateToFlashcards() {
    this.navigateTo(TabName.flashcards);
  }

  navigateToSelectedCollectionView(collectionId: string | undefined) {
    const urlData = this._navBuilder.setCollectionTab().setSingleColumnView().setCollectionView(collectionId).build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToCollectionAddForm(viewCollectionId?: string | undefined) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(viewCollectionId)
      .setAddForm()
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToCollectionEditForm(formCollectionId: string, viewCollectionId?: string | undefined) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(viewCollectionId)
      .setEditForm(formCollectionId)
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }
}
