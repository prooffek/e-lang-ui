import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

const POPUP_TIMEOUT: number = 5000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly _toastrService = inject(ToastrService);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              this.handleValidationError(error);
              break;
            default:
              this._toastrService.error(error.message, error.statusText, { closeButton: true, timeOut: 5000 });
              break;
          }
        }
        return throwError(error);
      }),
    );
  }

  private handleValidationError(error: HttpErrorResponse): Observable<never> {
    // Convert the Blob to JSON
    return error.error.text().then((errorMessage: string) => {
      try {
        const validationErrors = JSON.parse(errorMessage);

        if (validationErrors.errors) {
          const modalStateErrors = [];
          for (const key in validationErrors.errors) {
            if (validationErrors.errors[key]) {
              modalStateErrors.push(validationErrors.errors[key]);
            }
          }
          const messages = modalStateErrors.flat().join('</br> - ');

          this._toastrService.error(`- ${messages}`, 'Validation failed:', {
            closeButton: true,
            timeOut: POPUP_TIMEOUT,
            enableHtml: true,
          });
        } else {
          this._toastrService.error(validationErrors.message, validationErrors.statusText, {
            closeButton: true,
            timeOut: POPUP_TIMEOUT,
            enableHtml: true,
          });
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }

      // return throwError(error);
    });
  }
}
