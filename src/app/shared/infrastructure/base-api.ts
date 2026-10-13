import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * base type for the api pattern
 * @author rodrigo andree saavedra flores
 */
export abstract class BaseApi {
  protected readonly http = inject(HttpClient);
}
