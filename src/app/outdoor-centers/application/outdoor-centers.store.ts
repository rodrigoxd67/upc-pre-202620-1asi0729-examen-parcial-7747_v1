import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { OutdoorCenter } from '../domain/model/outdoor-center.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { OutdoorCenterSummary } from '../domain/model/outdoor-center-summary';
import { OutdoorCentersApi } from '../infrastructure/outdoor-centers-api';

/**
 * state management of the outdoor centers bounded context
 * @author rodrigo andree saavedra flores
 */
@Injectable({
  providedIn: 'root',
})
export class OutdoorCentersStore {
  readonly #outdoorCentersApi = inject(OutdoorCentersApi);
  readonly #outdoorCentersSignal = signal<OutdoorCenter[]>([]);
  readonly outdoorCenters = this.#outdoorCentersSignal.asReadonly();
  readonly outdoorCenterCount = computed(() => this.outdoorCenters().length);
  readonly activityTypes = computed(() => this.outdoorCenters().map((c) => c.activityType));
  readonly #reservationsSignal = signal<Reservation[]>([]);
  readonly reservations = this.#reservationsSignal.asReadonly();
  readonly reservationCount = computed(() => this.reservations().length);
  readonly #loadingSignal = signal<boolean>(false);
  readonly loading = this.#loadingSignal.asReadonly();
  readonly #errorSignal = signal<string | null>(null);
  readonly error = this.#errorSignal.asReadonly();
  readonly outdoorCenterSummaries = computed(() =>
    this.outdoorCenters().map((center) => this.getOutdoorCenterSummary(center)),
  );

  constructor() {
    this.#loadOutdoorCenters();
    this.#loadReservations();
  }

  getOutdoorCenterByActivityType(activityType: string): Signal<OutdoorCenter | undefined> {
    return computed(() => this.outdoorCenters().find((c) => c.activityType === activityType));
  }

  getReservationsByOutdoorCenterId(outdoorCenterId: number): Reservation[] {
    return this.reservations().filter((r) => r.outdoorCenterId === outdoorCenterId);
  }

  getOutdoorCenterSummary(outdoorCenter: OutdoorCenter): OutdoorCenterSummary {
    return new OutdoorCenterSummary(
      outdoorCenter,
      this.getReservationsByOutdoorCenterId(outdoorCenter.id),
    );
  }

  addReservation(reservation: Reservation, onCreated?: () => void): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#outdoorCentersApi
      .createReservation(reservation)
      .pipe(retry(2))
      .subscribe({
        next: (createdReservation) => {
          this.#reservationsSignal.update((reservations) => [...reservations, createdReservation]);
          this.#loadingSignal.set(false);
          onCreated?.();
        },
        error: (err) => {
          this.#errorSignal.set(this.#formatError(err, 'failed to create reservation'));
          this.#loadingSignal.set(false);
        },
      });
  }

  #loadOutdoorCenters(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#outdoorCentersApi
      .getOutdoorCenters()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (outdoorCenters) => {
          this.#outdoorCentersSignal.set(outdoorCenters);
          this.#loadingSignal.set(false);
        },
        error: (err) => {
          this.#errorSignal.set(this.#formatError(err, 'failed to load outdoor centers'));
          this.#loadingSignal.set(false);
        },
      });
  }

  #loadReservations(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#outdoorCentersApi
      .getReservations()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (reservations) => {
          this.#reservationsSignal.set(reservations);
          this.#loadingSignal.set(false);
        },
        error: (err) => {
          this.#errorSignal.set(this.#formatError(err, 'failed to load reservations'));
          this.#loadingSignal.set(false);
        },
      });
  }

  #formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('resource not found')
        ? `${fallback}: not found`
        : error.message;
    }
    return fallback;
  }
}
