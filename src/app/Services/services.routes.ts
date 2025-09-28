import { Routes } from '@angular/router';

import { ServiceCenter } from './service-center/service-center';
import { ServiceList } from './service-list/service-list';
import { ServiceDetails } from './service-details/service-details';
import { ServiceEdit } from './service-edit/service-edit';

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
        path: 'edit/new',
        component: ServiceEdit
      },
      {
        path: 'edit/:id',
        component: ServiceEdit
      },
      {
        path: ':id',
        component: ServiceDetails
      }
    ]
  }
];