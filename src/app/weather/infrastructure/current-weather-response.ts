import { BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * response and resources of the open-meteo forecast endpoint
 * @author rodrigo andree saavedra flores
 */
export interface CurrentWeatherResponse extends BaseResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnitsResource;
  current: CurrentWeatherResource;
}

export interface CurrentUnitsResource {
  time: string;
  interval: string;
  temperature_2m: string;
}

export interface CurrentWeatherResource {
  time: string;
  interval: number;
  temperature_2m: number;
}
