import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NgOnDestroy implements OnDestroy {
  private _destroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this._destroyed$.next(undefined);
    this._destroyed$.complete();
  }
}
