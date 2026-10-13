import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { OutdoorCenter } from '../domain/model/outdoor-center.entity';
import { OutdoorCenterResource, OutdoorCentersResponse } from './outdoor-centers-response';
import { OutdoorCenterAssembler } from './outdoor-center-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * endpoint of the outdoor centers resource
 * @author rodrigo andree saavedra flores
 */
export class OutdoorCentersApiEndpoint extends BaseApiEndpoint<
  OutdoorCenter,
  OutdoorCenterResource,
  OutdoorCentersResponse,
  OutdoorCenterAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderOutdoorCentersEndpointPath}`,
      new OutdoorCenterAssembler(),
    );
  }
}
