import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { RouteParamService } from '../../../core/services/router/route-param.service';
import { CollectionStore } from '../../../stores/collections-store/store';
import { CollectionDto } from '../../../core/services/api-client/api-client';
import { NavigationService } from '../../../core/services/router/navigation.service';

const ID_PARAM_NAME = 'id';

@Component({
  selector: 'app-user-collections-view',
  templateUrl: './user-collections-view.component.html',
  styleUrls: ['./user-collections-view.component.scss'],
})
export class UserCollectionsViewComponent implements OnInit {
  private readonly _routeParamService = inject(RouteParamService);
  private readonly _navigationService = inject(NavigationService);
  private readonly _collectionStore = inject(CollectionStore);

  currentCollectionId = this._routeParamService.getParamFromRoute(ID_PARAM_NAME);
  currentCollection: Signal<CollectionDto | undefined> = this._collectionStore.getCurrentCollection;
  mainCollectionCards = this._collectionStore.getInitCollectionCards();

  constructor() {
    effect(
      () => {
        const collectionId = this.currentCollectionId();

        if (collectionId) {
          this._collectionStore.loadCurrentCollection(collectionId!);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this._collectionStore.loadInitCollectionCards();
  }

  selectCollection(collectionId: string) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }

  navigateBack(collectionId: string | undefined) {
    this._navigationService.navigateToSelectedCollectionView(collectionId);
  }
}
