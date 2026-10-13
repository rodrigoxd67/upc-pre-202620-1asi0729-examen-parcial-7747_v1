import { OutdoorCenter } from './outdoor-center.entity';
import { Reservation } from './reservation.entity';

/**
 * outdoor center with its reservations, total participants and available capacity
 * @author rodrigo andree saavedra flores
 */
export class OutdoorCenterSummary {
  readonly #outdoorCenter: OutdoorCenter;
  readonly #reservations: Reservation[];

  constructor(outdoorCenter: OutdoorCenter, reservations: Reservation[]) {
    this.#outdoorCenter = outdoorCenter;
    this.#reservations = reservations;
  }

  get outdoorCenter(): OutdoorCenter {
    return this.#outdoorCenter;
  }

  get reservations(): Reservation[] {
    return this.#reservations;
  }

  get isEmpty(): boolean {
    return this.#reservations.length === 0;
  }

  get totalParticipants(): number {
    return this.#reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  get availableCapacity(): number {
    return this.#outdoorCenter.capacity - this.totalParticipants;
  }
}
