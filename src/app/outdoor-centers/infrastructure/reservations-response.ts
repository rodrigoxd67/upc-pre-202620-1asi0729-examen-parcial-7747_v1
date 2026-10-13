import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * response and resource of the reservations endpoint
 * @author rodrigo andree saavedra flores
 */
export interface ReservationsResponse extends BaseResponse {
  reservations: ReservationResource[];
}

export interface ReservationResource extends BaseResource {
  id: number;
  outdoorCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
