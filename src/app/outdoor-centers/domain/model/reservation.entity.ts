import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * reservation of participants registered in an outdoor center
 * @author rodrigo andree saavedra flores
 */
export class Reservation implements BaseEntity {
  #id: number;
  #outdoorCenterId: number;
  #activityType: string;
  #participantName: string;
  #participants: number;
  #weatherTemperature: number;
  #reservedAt: Date;

  constructor(reservation: {
    id: number;
    outdoorCenterId: number;
    activityType: string;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.#id = reservation.id;
    this.#outdoorCenterId = reservation.outdoorCenterId;
    this.#activityType = reservation.activityType;
    this.#participantName = reservation.participantName;
    this.#participants = reservation.participants;
    this.#weatherTemperature = reservation.weatherTemperature;
    this.#reservedAt = reservation.reservedAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get outdoorCenterId(): number {
    return this.#outdoorCenterId;
  }

  set outdoorCenterId(value: number) {
    this.#outdoorCenterId = value;
  }

  get activityType(): string {
    return this.#activityType;
  }

  set activityType(value: string) {
    this.#activityType = value;
  }

  get participantName(): string {
    return this.#participantName;
  }

  set participantName(value: string) {
    this.#participantName = value;
  }

  get participants(): number {
    return this.#participants;
  }

  set participants(value: number) {
    this.#participants = value;
  }

  get weatherTemperature(): number {
    return this.#weatherTemperature;
  }

  set weatherTemperature(value: number) {
    this.#weatherTemperature = value;
  }

  get reservedAt(): Date {
    return this.#reservedAt;
  }

  set reservedAt(value: Date) {
    this.#reservedAt = value;
  }
}
