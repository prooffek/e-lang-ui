import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TabName } from '../../enums/topbar-constants';
import { NavigationBuilder } from '../../builders/route/navigation-builder';
import { AttemptDto } from '../api-client/api-client';

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

  navigateTo(data: { commands: string[]; queryParams: { [key: string]: any } | undefined }) {
    this._route.navigate(data.commands, { queryParams: data.queryParams });
  }

  navigateToPath(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }

    this._route.navigateByUrl(path);
  }

  navigateHome() {
    this.navigateToPath('/');
  }

  navigateToCollections() {
    this.navigateToPath(TabName.collections);
  }

  navigateToFlashcards() {
    this.navigateToPath(TabName.flashcards);
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
      .setAddCollectionForm()
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToCollectionEditForm(formCollectionId: string, viewCollectionId?: string | undefined) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(viewCollectionId)
      .setCollectionEditForm(formCollectionId)
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToFlashcardAddForm(viewCollectionId?: string) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(viewCollectionId)
      .setAddFlashcardForm()
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToFlashcardEditForm(flashcardId: string) {
    const urlData = this._navBuilder.setFlashcardsTab().setDoubleColumnView().setFlashcardEditForm(flashcardId).build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToCollectionFlashcardEditForm(flashcardId: string, collectionId?: string) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(collectionId)
      .setFlashcardEditForm(flashcardId)
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToAttemptAddForm(collectionId: string) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(collectionId)
      .setAttemptAddForm()
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToAttempts(collectionId: string) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(collectionId)
      .setAttemptsColumn()
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }

  navigateToAttemptDetails(attempt: AttemptDto) {
    const urlData = this._navBuilder
      .setCollectionTab()
      .setDoubleColumnView()
      .setCollectionView(attempt.collectionId)
      .setAttemptDetails(attempt.id)
      .build();

    this._route.navigate(urlData.commands, { queryParams: urlData.queryParams });
  }
}
