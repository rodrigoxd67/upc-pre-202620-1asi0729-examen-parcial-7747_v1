import { CurrentWeather } from '../domain/model/current-weather.entity';
import { CurrentWeatherResponse } from './current-weather-response';

/**
 * maps the open-meteo forecast response to the current weather entity
 * @author rodrigo andree saavedra flores
 */
export class CurrentWeatherAssembler {
  toEntityFromResponse(response: CurrentWeatherResponse): CurrentWeather {
    return new CurrentWeather({
      latitude: response.latitude,
      longitude: response.longitude,
      temperature: response.current.temperature_2m,
      temperatureUnit: response.current_units.temperature_2m,
      measuredAt: new Date(response.current.time),
    });
  }
}
