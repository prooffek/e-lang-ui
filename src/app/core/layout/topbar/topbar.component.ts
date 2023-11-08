import { Component, inject } from '@angular/core';
import { TabNames } from './tab/topbar-constants';
import { NavigationService } from '../../services/router/navigation.service';
import { RouteParamService } from '../../services/router/route-param.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  private readonly _navigationService = inject(NavigationService);
  private readonly _routParamService = inject(RouteParamService);

  protected readonly TabNames = TabNames;

  activeTab = this._routParamService.getActiveTab();

  tabClick(path: string) {
    this._navigationService.navigateTo(path);
  }
}
