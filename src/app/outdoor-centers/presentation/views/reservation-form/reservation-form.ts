import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { OutdoorCentersStore } from '../../../application/outdoor-centers.store';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { Reservation } from '../../../domain/model/reservation.entity';

/**
 * reactive form view to register a new reservation in an outdoor center
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
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
      validators: [Validators.required],
    }),
    participants: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  constructor() {
    super();
    this.form.controls.activityType.valueChanges.subscribe((activityType) => {
      const outdoorCenter = this.store.getOutdoorCenterByActivityType(activityType)();
      if (outdoorCenter) {
        this.weatherStore.loadCurrentWeather(outdoorCenter.latitude, outdoorCenter.longitude);
      }
    });
  }

  get availableCapacity(): number {
    const outdoorCenter = this.store.getOutdoorCenterByActivityType(
      this.form.controls.activityType.value,
    )();
    return outdoorCenter ? this.store.getOutdoorCenterSummary(outdoorCenter).availableCapacity : 0;
  }

  get exceedsCapacity(): boolean {
    return this.form.controls.participants.value > this.availableCapacity;
  }

  submit() {
    if (this.form.invalid || this.exceedsCapacity) return;
    const { activityType, participantName, participants } = this.form.getRawValue();
    const outdoorCenter = this.store.getOutdoorCenterByActivityType(activityType)();
    const currentWeather = this.weatherStore.currentWeather();
    if (!outdoorCenter || !currentWeather) return;

    const reservation = new Reservation({
      id: 0,
      outdoorCenterId: outdoorCenter.id,
      activityType,
      participantName,
      participants,
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date(),
    });

    this.store.addReservation(reservation, () => {
      this.#snackBar.open(this.#translate.instant('reservation.created'), '', { duration: 3000 });
      this.navigateToHome();
    });
  }

  navigateToHome() {
    this.#router.navigate(['home']).then();
  }
}
