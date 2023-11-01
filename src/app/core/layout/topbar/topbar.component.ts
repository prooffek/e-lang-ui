import { Component } from '@angular/core';
import { TabNames } from './tab/topbar-constants';
import { NavigationService } from '../../services/router/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  protected readonly TabNames = TabNames;

  selectedTab$: Observable<string> = this._navigationService.getActiveTab();

  constructor(private _navigationService: NavigationService) {}

  tabClick(path: string) {
    this._navigationService.navigateTo(path);
  }
}
