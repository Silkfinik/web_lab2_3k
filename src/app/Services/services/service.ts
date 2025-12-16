import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../service.model';
import { AbstractDataService } from './abstract-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends AbstractDataService {
  private servicesUrl = 'http://localhost:8080/DemoSpring/api/services';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    super();
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.servicesUrl);
  }

  getService(id: string): Observable<Service> {
    const url = `${this.servicesUrl}/${id}`;
    return this.http.get<Service>(url);
  }

  addService(service: Omit<Service, 'id'>): Observable<Service> {
    return this.http.post<Service>(this.servicesUrl, service, this.httpOptions);
  }

  updateService(service: Service): Observable<any> {
    return this.http.put(this.servicesUrl, service, this.httpOptions);
  }

  deleteService(id: string): Observable<Service> {
    const url = `${this.servicesUrl}/${id}`;
    return this.http.delete<Service>(url, this.httpOptions);
  }
}
