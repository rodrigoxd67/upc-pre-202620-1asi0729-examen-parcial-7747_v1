import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationResource, ReservationsResponse } from './reservations-response';

/**
 * maps reservation resources to entities and back
 * @author rodrigo andree saavedra flores
 */
export class ReservationAssembler implements BaseAssembler<
  Reservation,
  ReservationResource,
  ReservationsResponse
> {
  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.reservations.map((resource) =>
      this.toEntityFromResource(resource as ReservationResource),
    );
  }

  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation({
      id: resource.id,
      outdoorCenterId: resource.outdoorCenterId,
      activityType: resource.activityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt),
    });
  }

  toResourceFromEntity(entity: Reservation): ReservationResource {
    return {
      id: entity.id,
      outdoorCenterId: entity.outdoorCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString().slice(0, 19),
    } as ReservationResource;
  }
}
