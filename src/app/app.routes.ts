import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./Services/services.routes')
                        .then(m => m.SERVICES_ROUTES)
  },
  {
    path: '',
    redirectTo: '/services',
    pathMatch: 'full'
  }
];