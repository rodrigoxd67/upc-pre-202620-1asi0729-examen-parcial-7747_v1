import { BaseResource, BaseResponse } from './base-response';
import { BaseEntity } from '../domain/model/base-entity';

/**
 * base contract for the assembler pattern
 * @author rodrigo andree saavedra flores
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
> {
  toEntityFromResource(resource: TResource): TEntity;

  toResourceFromEntity(entity: TEntity): TResource;

  toEntitiesFromResponse(response: TResponse): TEntity[];
}
