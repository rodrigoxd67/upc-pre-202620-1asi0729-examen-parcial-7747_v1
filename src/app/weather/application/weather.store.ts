import { inject, Injectable, signal } from '@angular/core';
import { retry } from 'rxjs';
import { CurrentWeather } from '../domain/model/current-weather.entity';
import { WeatherApi } from '../infrastructure/weather-api';

/**
 * state management of the weather bounded context
 * @author rodrigo andree saavedra flores
 */
@Injectable({
  providedIn: 'root',
})
export class WeatherStore {
  readonly #weatherApi = inject(WeatherApi);
  readonly #currentWeatherSignal = signal<CurrentWeather | null>(null);
  readonly currentWeather = this.#currentWeatherSignal.asReadonly();
  readonly #loadingSignal = signal<boolean>(false);
  readonly loading = this.#loadingSignal.asReadonly();
  readonly #errorSignal = signal<string | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  loadCurrentWeather(latitude: number, longitude: number): void {
    this.#currentWeatherSignal.set(null);
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#weatherApi
      .getCurrentWeather(latitude, longitude)
      .pipe(retry(2))
      .subscribe({
        next: (currentWeather) => {
          this.#currentWeatherSignal.set(currentWeather);
          this.#loadingSignal.set(false);
        },
        error: (err) => {
          this.#errorSignal.set(this.#formatError(err, 'failed to load current weather'));
          this.#loadingSignal.set(false);
        },
      });
  }

  #formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('resource not found')
        ? `${fallback}: not found`
        : error.message;
    }
    return fallback;
  }
}
