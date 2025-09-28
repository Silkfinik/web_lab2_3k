
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../service.model';
import { SERVICES } from './mock-service-list';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Service[] = SERVICES;

  constructor() { }

  getServices(): Observable<Service[]> {
    return of(this.services);
  }

  getService(id: number | string): Observable<Service | undefined> {
    const service = this.services.find(s => s.id === +id);
    return of(service);
  }

  addService(service: Service): Observable<Service> {
    const maxId = Math.max(...this.services.map(s => s.id));
    const newService = { ...service, id: maxId + 1 };
    this.services.push(newService);
    return of(newService);
  }

  updateService(serviceToUpdate: Service): Observable<Service> {
    const index = this.services.findIndex(s => s.id === serviceToUpdate.id);
    if (index !== -1) {
      this.services[index] = serviceToUpdate;
    }
    return of(serviceToUpdate);
  }

  deleteService(id: number): Observable<boolean> {
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}