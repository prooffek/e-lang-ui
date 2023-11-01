import { Component, Input } from '@angular/core';
import { NavigationService } from '../../../services/router/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() navigationTargets: string[] = [];

  constructor(private _navigationService: NavigationService) {}

  navigateHome() {
    this._navigationService.navigateHome();
  }
}
