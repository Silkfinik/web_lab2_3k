import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceList } from './service-list';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AbstractDataService } from '../services/abstract-data.service';
import { of } from 'rxjs';
import { Service } from '../service.model';
import { ActivatedRoute } from '@angular/router';

class MockAbstractDataService {
  getServices() { return of([]); }
  getService(id: string) { return of(undefined); }
  addService(service: Omit<Service, 'id'>) { return of(service); }
  updateService(service: Service) { return of(undefined); }
  deleteService(id: string) { return of(undefined); }
}

describe('ServiceList', () => {
  let component: ServiceList;
  let fixture: ComponentFixture<ServiceList>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return '1';
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceList],
      providers: [
        { provide: AbstractDataService, useClass: MockAbstractDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
