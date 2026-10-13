/**
 * current weather conditions for a pair of coordinates
 * @author rodrigo andree saavedra flores
 */
export class CurrentWeather {
  #latitude: number;
  #longitude: number;
  #temperature: number;
  #temperatureUnit: string;
  #measuredAt: Date;

  constructor(currentWeather: {
    latitude: number;
    longitude: number;
    temperature: number;
    temperatureUnit: string;
    measuredAt: Date;
  }) {
    this.#latitude = currentWeather.latitude;
    this.#longitude = currentWeather.longitude;
    this.#temperature = currentWeather.temperature;
    this.#temperatureUnit = currentWeather.temperatureUnit;
    this.#measuredAt = currentWeather.measuredAt;
  }

  get latitude(): number {
    return this.#latitude;
  }

  set latitude(value: number) {
    this.#latitude = value;
  }

  get longitude(): number {
    return this.#longitude;
  }

  set longitude(value: number) {
    this.#longitude = value;
  }

  get temperature(): number {
    return this.#temperature;
  }

  set temperature(value: number) {
    this.#temperature = value;
  }

  get temperatureUnit(): string {
    return this.#temperatureUnit;
  }

  set temperatureUnit(value: string) {
    this.#temperatureUnit = value;
  }

  get measuredAt(): Date {
    return this.#measuredAt;
  }

  set measuredAt(value: Date) {
    this.#measuredAt = value;
  }
}
