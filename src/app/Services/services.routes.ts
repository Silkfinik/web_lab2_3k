import { Routes } from '@angular/router';

import { ServiceCenter } from './service-center/service-center';
import { ServiceList } from './service-list/service-list';
import { ServiceDetails } from './service-details/service-details';

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    component: ServiceCenter,
    children: [
      {
        path: '',
        component: ServiceList
      },
      {
        path: ':id',
        component: ServiceDetails
      }
    ]
  }
];