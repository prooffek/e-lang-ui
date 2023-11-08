import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Route } from './navigation.service';
import { TabNames } from '../../layout/topbar/tab/topbar-constants';

@Injectable({
  providedIn: 'root',
})
export class RouteParamService {
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  getParamFromRoute(paramName: string) {
    const queryParams$ = this._activatedRoute.queryParamMap.pipe(map((params) => params.get(paramName)));
    return toSignal(queryParams$);
  }

  getParamsFromRoute() {
    return this._activatedRoute.queryParams;
  }

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
    const tabNames: string[] = Object.values(TabNames);
    const activeTab: string = route.url.split('/').filter((x: string) => x)[0];

    return activeTab && tabNames.includes(activeTab) ? activeTab : TabNames.Collections;
  }

  private getFromRout<T>(mapExpression: (route: Route) => T) {
    return this._router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(mapExpression),
    );
  }
}
