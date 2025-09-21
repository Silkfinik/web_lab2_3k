import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../service.model';
import { SERVICES } from './mock-service-list';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  getServices(): Observable<Service[]> {
    return of(SERVICES);
  }

  getService(id: number | string): Observable<Service | undefined> {
    const service = SERVICES.find(s => s.id === +id);
    return of(service);
  }
}