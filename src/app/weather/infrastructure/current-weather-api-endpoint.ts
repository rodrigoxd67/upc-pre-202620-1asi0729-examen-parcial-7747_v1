import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { CurrentWeather } from '../domain/model/current-weather.entity';
import { CurrentWeatherResponse } from './current-weather-response';
import { CurrentWeatherAssembler } from './current-weather-assembler';
import { environment } from '../../../environments/environment';

/**
 * endpoint of the open-meteo current temperature forecast
 * @author rodrigo andree saavedra flores
 */
export class CurrentWeatherApiEndpoint extends ErrorHandlingEnabledBaseType {
  readonly #endpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  readonly #assembler = new CurrentWeatherAssembler();

  constructor(private http: HttpClient) {
    super();
  }

  getByCoordinates(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeatherResponse>(this.#endpointUrl, {
        params: { latitude, longitude, current: 'temperature_2m' },
      })
      .pipe(
        map((response) => this.#assembler.toEntityFromResponse(response)),
        catchError(this.handleError('failed to fetch current weather')),
      );
  }
}
