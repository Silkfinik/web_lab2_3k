import { Observable } from 'rxjs';
import { Service } from '../service.model';

export abstract class AbstractDataService {
  abstract getServices(): Observable<Service[]>;
  abstract getService(id: string): Observable<Service | undefined>;
  abstract addService(service: Omit<Service, 'id'>): Observable<any>;
  abstract updateService(service: Service): Observable<any>;
  abstract deleteService(id: string): Observable<any>;
}
