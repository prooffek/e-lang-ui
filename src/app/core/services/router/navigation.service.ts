import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TabNames } from '../../layout/topbar/tab/topbar-constants';
import { CollectionParams } from '../../constants/route-param-names';

export interface Route {
  FirstChild: any;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _route = inject(Router);

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
    this.navigateTo(TabNames.Collections);
  }

  navigateToFlashcards() {
    this.navigateTo(TabNames.Flashcards);
  }

  navigateToSelectedCollectionView(collectionId: string | undefined) {
    this._route.navigate([TabNames.Collections], { queryParams: { [CollectionParams.id]: collectionId } });
  }
}
