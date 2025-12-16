import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { ServiceEdit } from './service-edit';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AbstractDataService } from '../services/abstract-data.service';
import { Service } from '../service.model';

class MockAbstractDataService {
  mockService: Service = { id: '1', description: 'Test Service', price: 100 };
  getServices() { return of([this.mockService]); }
  getService(id: string): Observable<Service | undefined> { return of(this.mockService); }
  addService(service: Omit<Service, 'id'>) { return of(service); }
  updateService(service: Service) { return of(undefined); }
  deleteService(id: string) { return of(undefined); }
}

describe('ServiceEdit', () => {
  let component: ServiceEdit;
  let fixture: ComponentFixture<ServiceEdit>;

  const mockActivatedRoute = {
    snapshot: { // <--- Added snapshot here
      paramMap: {
        get: (key: string) => {
          return '1';
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceEdit],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AbstractDataService, useClass: MockAbstractDataService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
