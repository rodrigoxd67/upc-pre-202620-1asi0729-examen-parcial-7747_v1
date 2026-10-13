import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { OutdoorCenter } from '../domain/model/outdoor-center.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { OutdoorCentersApiEndpoint } from './outdoor-centers-api-endpoint';
import { ReservationsApiEndpoint } from './reservations-api-endpoint';

/**
 * api of the outdoor centers bounded context
 * @author rodrigo andree saavedra flores
 */
@Injectable({ providedIn: 'root' })
export class OutdoorCentersApi extends BaseApi {
  readonly #outdoorCentersEndpoint = new OutdoorCentersApiEndpoint(this.http);
  readonly #reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getOutdoorCenters(): Observable<OutdoorCenter[]> {
    return this.#outdoorCentersEndpoint.getAll();
  }

  getOutdoorCenter(id: number): Observable<OutdoorCenter> {
    return this.#outdoorCentersEndpoint.getById(id);
  }

  getReservations(): Observable<Reservation[]> {
    return this.#reservationsEndpoint.getAll();
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.#reservationsEndpoint.create(reservation);
  }
}
