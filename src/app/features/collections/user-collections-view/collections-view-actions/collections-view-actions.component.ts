import { Component, EventEmitter, Input, Output } from '@angular/core';

const ADD_ICON = 'add-black';
const GO_BACK_ICON = 'arrow-left-black';

@Component({
  selector: 'app-collections-view-actions',
  templateUrl: './collections-view-actions.component.html',
  styleUrls: ['./collections-view-actions.component.scss'],
})
export class CollectionsViewActionsComponent {
  private _parentCollectionName: string = '';

  @Input() hasParent: boolean = false;
  @Input() parentCollectionId: string | undefined;
  @Input() set parentCollectionName(value: string | undefined) {
    if (!value) {
      this._parentCollectionName = 'Main page';
    } else if (value.length > 10) {
      this._parentCollectionName = value.slice(0, 10) + '...';
    } else {
      this._parentCollectionName = value;
    }
  }

  get parentCollectionName() {
    return this._parentCollectionName;
  }

  @Output() onNavigateBack = new EventEmitter<string | undefined>();
  @Output() onAddCollectionClick = new EventEmitter();
  @Output() onAddFlashcardClick = new EventEmitter();

  addIcon = ADD_ICON;
  goBackIcon = GO_BACK_ICON;

  navigateBack() {
    this.onNavigateBack.emit(this.parentCollectionId);
  }

  addCollection() {
    this.onAddCollectionClick.emit();
  }

  addFlashcard() {
    this.onAddFlashcardClick.emit();
  }
}
