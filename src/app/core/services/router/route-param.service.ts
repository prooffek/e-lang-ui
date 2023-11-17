import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Route } from './navigation.service';
import { TabName } from '../../enums/topbar-constants';

@Injectable({
  providedIn: 'root',
})
export class RouteParamService {
  private _router = inject(Router);

  getActiveTab() {
    const tabName$ = this.getFromRout<string>((route: Route) => {
      route = this.getRoute(route);
      return this.getTabName(route);
    });

    return toSignal(tabName$);
  }

  private getRoute(route: Route) {
    while (route.FirstChild) {
      route = route.FirstChild;
    }
    return route;
  }

  private getTabName(route: Route) {
    const tabNames: string[] = Object.values(TabName);
    const activeTab: string = route.url.split('/').filter((x: string) => x)[0];

    return activeTab && tabNames.includes(activeTab) ? activeTab : TabName.collections;
  }

  private getFromRout<T>(mapExpression: (route: Route) => T) {
    return this._router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(mapExpression),
    );
  }
}
