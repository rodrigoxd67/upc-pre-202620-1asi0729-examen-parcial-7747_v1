import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * base type with a common http error handler
 * @author rodrigo andree saavedra flores
 */
export abstract class ErrorHandlingEnabledBaseType {
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if (error.status === 404) {
        errorMessage = `${operation}: resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.status || 'unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}
