import { Routes } from '@angular/router';

export const inscriptionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./inscriptions-list/inscriptions-list.component').then(
        m => m.InscriptionsListComponent
      ),
  },
  {
    path: 'my',
    loadComponent: () =>
      import('./my-inscriptions/my-inscriptions.component').then(m => m.MyInscriptionsComponent),
  },
];
