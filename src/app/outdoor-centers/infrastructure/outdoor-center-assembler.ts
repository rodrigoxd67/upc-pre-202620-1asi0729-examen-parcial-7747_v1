import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { OutdoorCenter } from '../domain/model/outdoor-center.entity';
import { OutdoorCenterResource, OutdoorCentersResponse } from './outdoor-centers-response';

/**
 * maps outdoor center resources to entities and back
 * @author rodrigo andree saavedra flores
 */
export class OutdoorCenterAssembler implements BaseAssembler<
  OutdoorCenter,
  OutdoorCenterResource,
  OutdoorCentersResponse
> {
  toEntitiesFromResponse(response: OutdoorCentersResponse): OutdoorCenter[] {
    return response.outdoorCenters.map((resource) =>
      this.toEntityFromResource(resource as OutdoorCenterResource),
    );
  }

  toEntityFromResource(resource: OutdoorCenterResource): OutdoorCenter {
    return new OutdoorCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude,
    });
  }

  toResourceFromEntity(entity: OutdoorCenter): OutdoorCenterResource {
    return {
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude,
    } as OutdoorCenterResource;
  }
}
