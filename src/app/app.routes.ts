import { Routes } from '@angular/router';

const home = () => import('./shared/presentation/views/home/home').then((m) => m.Home);

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'trailgo outdoor center management platform';

/**
 * root routes of the application
 * @author rodrigo andree saavedra flores
 */
export const routes: Routes = [
  { path: 'home', loadComponent: home, title: `${baseTitle} - home` },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - page not found` },
];
