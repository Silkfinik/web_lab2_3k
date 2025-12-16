import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ServiceService } from './service';
import { Service } from '../service.model';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve services via GET', () => {
    const dummyServices: Service[] = [
      { id: '1', description: 'Service 1', price: 100 },
      { id: '2', description: 'Service 2', price: 200 }
    ];

    service.getServices().subscribe(services => {
      expect(services.length).toBe(2);
      expect(services).toEqual(dummyServices);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/services');
    expect(req.request.method).toBe('GET');
    req.flush(dummyServices);
  });

  it('should retrieve a single service via GET', () => {
    const dummyService: Service = { id: '1', description: 'Service 1', price: 100 };

    service.getService('1').subscribe(s => {
      expect(s).toEqual(dummyService);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/services/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyService);
  });

  it('should add a service via POST', () => {
    const newService: Service = { id: '3', description: 'Service 3', price: 300 };

    service.addService(newService).subscribe(s => {
      expect(s).toEqual(newService);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/services');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newService);
    req.flush(newService);
  });

  it('should update a service via PUT', () => {
    const updatedService: Service = { id: '1', description: 'Updated Service 1', price: 150 };

    service.updateService(updatedService).subscribe(s => {
      expect(s).toEqual(updatedService);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/services');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedService);
    req.flush(updatedService);
  });

  it('should delete a service via DELETE', () => {
    const serviceId = '1';

    service.deleteService(serviceId).subscribe(res => {
        expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/services/${serviceId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});