import { Component, EventEmitter, Input, Output } from '@angular/core';

const ADD_ICON = 'add-black';
const GO_BACK_ICON = 'arrow-left-black';
const SHOW_SUBCOLLECTIONS = 'collections-black';
const SHOW_FLASHCARDS = 'cards-black';
const LEARN_ICON = 'school-black';

@Component({
  selector: 'app-collections-view-actions',
  templateUrl: './collections-view-actions.component.html',
  styleUrls: ['./collections-view-actions.component.scss'],
})
export class CollectionsViewActionsComponent {
  private _parentCollectionName: string = '';

  @Input() hasParent: boolean = false;
  @Input() parentCollectionId: string | undefined;
  @Input() areFlashcardsVisible: boolean = false;
  @Input() showToggleButtons: boolean = false;
  @Input() isRowSelected: boolean = false;
  @Input() hasFlashcards: boolean = false;

  @Input() set parentCollectionName(value: string | undefined) {
    if (!value) {
      this._parentCollectionName = 'Main page';
    } else if (value.length > 10) {
      this._parentCollectionName = value.slice(0, 10) + '...';
    } else {
      this._parentCollectionName = value;
    }
  }

  public get parentCollectionName() {
    return this._parentCollectionName;
  }

  @Output() onNavigateBack = new EventEmitter<string | undefined>();
  @Output() onAddCollectionClick = new EventEmitter();
  @Output() onAddFlashcardClick = new EventEmitter();
  @Output() areFlashcardsVisibleChange = new EventEmitter<boolean>();
  @Output() onRemoveSelectedFlashcard = new EventEmitter();
  @Output() onLearn = new EventEmitter();

  addIcon = ADD_ICON;
  goBackIcon = GO_BACK_ICON;
  showSubcollectionsIcon = SHOW_SUBCOLLECTIONS;
  showFlashcardsIcon = SHOW_FLASHCARDS;
  learnIcon = LEARN_ICON;

  navigateBack() {
    this.onNavigateBack.emit(this.parentCollectionId);
  }

  addCollection() {
    this.onAddCollectionClick.emit();
  }

  addFlashcard() {
    this.onAddFlashcardClick.emit();
  }

  showFlashcards() {
    this.areFlashcardsVisibleChange.emit(true);
  }

  showSubcollections() {
    this.areFlashcardsVisibleChange.emit(false);
  }

  removeFlashcard() {
    this.onRemoveSelectedFlashcard.emit();
  }

  learn() {
    this.onLearn.emit();
  }
}
