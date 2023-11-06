import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { TabNames } from '../../layout/topbar/tab/topbar-constants';

export interface Route {
  FirstChild: any;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private _route: Router) {}

  getActiveTab(): Observable<string> {
    return this._route.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((route: Route) => {
        route = this.getRoute(route);
        return this.getTabName(route);
      }),
    );
  }

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

  private getRoute(route: Route) {
    while (route.FirstChild) {
      route = route.FirstChild;
    }
    return route;
  }

  private getTabName(route: Route) {
    const tabNames: string[] = Object.values(TabNames);

    const activeTab: string = route.url.split('/').filter((x: string) => x)[0];

    return activeTab && tabNames.includes(activeTab) ? activeTab : TabNames.Collections;
  }
}
