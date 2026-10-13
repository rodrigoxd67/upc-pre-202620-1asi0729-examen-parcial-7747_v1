import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { CurrentWeather } from '../domain/model/current-weather.entity';
import { CurrentWeatherApiEndpoint } from './current-weather-api-endpoint';

/**
 * api of the weather bounded context
 * @author rodrigo andree saavedra flores
 */
@Injectable({ providedIn: 'root' })
export class WeatherApi extends BaseApi {
  readonly #currentWeatherEndpoint = new CurrentWeatherApiEndpoint(this.http);

  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.#currentWeatherEndpoint.getByCoordinates(latitude, longitude);
  }
}
