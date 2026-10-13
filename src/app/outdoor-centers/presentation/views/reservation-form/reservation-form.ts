import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { OutdoorCentersStore } from '../../../application/outdoor-centers.store';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { OutdoorCenterSummary } from '../../../domain/model/outdoor-center-summary';
import { Reservation } from '../../../domain/model/reservation.entity';

/**
 * reactive form view to register a new reservation in an outdoor center
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner,
    TranslatePipe,
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm extends BaseForm {
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #snackBar = inject(MatSnackBar);
  #translate = inject(TranslateService);
  readonly store = inject(OutdoorCentersStore);
  readonly weatherStore = inject(WeatherStore);

  form = this.#fb.group({
    activityType: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    participantName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(60), Validators.pattern(/\S/)],
    }),
    participants: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+$/),
        (control: AbstractControl) => this.#availableCapacityValidator(control),
      ],
    }),
  });

  constructor() {
    super();
    this.form.controls.activityType.valueChanges.subscribe((activityType) => {
      this.form.controls.participants.updateValueAndValidity();
      const outdoorCenter = this.store.getOutdoorCenterByActivityType(activityType)();
      if (outdoorCenter) {
        this.weatherStore.loadCurrentWeather(outdoorCenter.latitude, outdoorCenter.longitude);
      }
    });
  }

  get selectedSummary(): OutdoorCenterSummary | undefined {
    const activityType = this.form?.controls.activityType.value;
    if (!activityType) return undefined;
    const outdoorCenter = this.store.getOutdoorCenterByActivityType(activityType)();
    return outdoorCenter ? this.store.getOutdoorCenterSummary(outdoorCenter) : undefined;
  }

  submit() {
    if (this.form.invalid) return;
    const summary = this.selectedSummary;
    const currentWeather = this.weatherStore.currentWeather();
    if (!summary || !currentWeather) return;
    const { activityType, participantName, participants } = this.form.getRawValue();

    const reservation = new Reservation({
      id: 0,
      outdoorCenterId: summary.outdoorCenter.id,
      activityType,
      participantName: participantName.trim(),
      participants: Number(participants),
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date(),
    });

    this.store.addReservation(reservation, () => {
      this.#snackBar.open(
        this.#translate.instant('reservation.created', { name: reservation.participantName }),
        this.#translate.instant('reservation.close'),
        { duration: 3000, politeness: 'polite' },
      );
      this.navigateToHome();
    });
  }

  cancel() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.#router.navigate(['home']).then();
  }

  #availableCapacityValidator(control: AbstractControl): ValidationErrors | null {
    const summary = this.selectedSummary;
    if (summary && control.value !== null && Number(control.value) > summary.availableCapacity) {
      return { exceedsCapacity: true };
    }
    return null;
  }
}
