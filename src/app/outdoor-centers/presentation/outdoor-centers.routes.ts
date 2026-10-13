import { Routes } from '@angular/router';

const reservationForm = () =>
  import('./views/reservation-form/reservation-form').then((m) => m.ReservationForm);

/**
 * child routes of the outdoor centers bounded context for reservations
 * @author rodrigo andree saavedra flores
 */
export const reservationsRoutes: Routes = [
  {
    path: 'new',
    loadComponent: reservationForm,
    title: 'trailgo outdoor center management platform - new reservation',
  },
];
