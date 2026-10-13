import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * response and resource of the outdoor centers endpoint
 * @author rodrigo andree saavedra flores
 */
export interface OutdoorCentersResponse extends BaseResponse {
  outdoorCenters: OutdoorCenterResource[];
}

export interface OutdoorCenterResource extends BaseResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}
