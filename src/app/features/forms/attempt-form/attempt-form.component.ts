import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormService } from '../../../core/services/form/form.service';
import { Store } from '@ngrx/store';
import { State } from '../../../store/root-state';
import { selectCurrentCollection } from '../../../store/collection-store/selectors';
import { AttemptFormControlNames, DefaultAttemptFormValues } from '../../../core/enums/form-constants';
import { AddAttemptDto, AttemptDto, CollectionDto, FlashcardOrder } from '../../../core/services/api-client/api-client';
import { DropdownOption } from '../../../shared/base-controls/dropdown/dopdown.model';
import { takeUntil, tap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { addAttempt } from '../../../store/attempt-store/actions';
import { ValidationErrorAttribute, ValidationErrorConstants } from '../../../core/enums/validation-error-constants';
import { SubscribedContainer } from '../../../core/base/subscribed.container';

@Component({
  selector: 'app-attempt-form',
  templateUrl: './attempt-form.component.html',
  styleUrls: ['./attempt-form.component.scss'],
})
export class AttemptFormComponent extends SubscribedContainer implements OnInit {
  private readonly _formService = inject(FormService);
  private readonly _store = inject(Store<State>);
  private readonly _changeDetection = inject(ChangeDetectorRef);

  protected readonly controlNames = AttemptFormControlNames;
  protected readonly defaultValues = DefaultAttemptFormValues;

  @Input() collectionId: string | undefined;
  @Input() attempts: AttemptDto[] = [];

  @Output() onClose = new EventEmitter();

  collection = this._store.select(selectCurrentCollection).pipe(
    tap((c) => {
      if (c?.flashcards) {
        this.initForm(c);
        this._changeDetection.markForCheck();
      }
    }),
  );

  orderOptions: DropdownOption<number>[] = [];

  form: any;

  ngOnInit(): void {
    this.orderOptions = this.getFlashcardOrderOptions();
  }

  closeRightColumn() {
    this.form?.reset();
    this.onClose.emit();
  }

  start() {
    this._store.dispatch(addAttempt({ addAttempt: this.form?.value as AddAttemptDto }));
    this.closeRightColumn();
  }

  private initForm(collection: CollectionDto) {
    this.form = this._formService.getAttemptAddFormGroup();
    this.form?.get(AttemptFormControlNames.collectionId)?.setValue(collection.id);
    this.setFlashcardsPerStage(collection.flashcards!.length);
    this.form
      .get(this.controlNames.maxFlashcardsPerStage)
      ?.addValidators(Validators.max(collection.flashcards!.length));
    this.form
      ?.get(this.controlNames.name)
      ?.valueChanges.pipe(
        takeUntil(this.destroyed$),
        tap((value: string | null) => this.validateAttemptName(value)),
      )
      .subscribe();
  }

  private validateAttemptName(name: string | null) {
    if (!this.attempts || !name) return;

    const nameExists = this.attempts.find((attempt) => attempt.name.toLowerCase() === name.toLowerCase());

    if (nameExists) {
      this.form?.get(this.controlNames.name)?.setErrors({
        [ValidationErrorConstants.valueInUse]: {
          [ValidationErrorAttribute.attribute]: 'name',
          [ValidationErrorAttribute.value]: name,
        },
      });
    }
  }

  private getFlashcardOrderOptions(): DropdownOption<number>[] {
    return Object.entries(FlashcardOrder)
      .filter(([key, _]) => !Number(key) && key !== '0')
      .map(([_, value]) => {
        switch (value) {
          case FlashcardOrder.AlphabeticalDesc:
            return { name: 'Name (Descending)', value } as DropdownOption<number>;
          case FlashcardOrder.AlphabeticalAsc:
            return { name: 'Name (Ascending)', value } as DropdownOption<number>;
          case FlashcardOrder.CreationDateDesc:
            return { name: 'Creation date (Descending)', value } as DropdownOption<number>;
          case FlashcardOrder.CreationDateAsc:
            return { name: 'Creation date (Ascending)', value } as DropdownOption<number>;
          default:
            return { name: 'Random', value } as DropdownOption<number>;
        }
      });
  }

  private setFlashcardsPerStage(flashcardsCount: number) {
    const control = this.form?.get(this.controlNames.maxFlashcardsPerStage);
    if (!control) return;
    if (!flashcardsCount || flashcardsCount < 0) flashcardsCount = 0;

    const initValue = control.value;

    if (!initValue || initValue > flashcardsCount) {
      control.setValue(flashcardsCount);
    }
  }
}
