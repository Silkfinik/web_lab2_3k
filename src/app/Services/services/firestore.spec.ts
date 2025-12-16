import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AbstractDataService } from './abstract-data.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { of } from 'rxjs';

describe('FirestoreService', () => {
  let service: FirestoreService;
  let firestore: Firestore;

  beforeEach(() => {
    const testApp = initializeApp({ projectId: 'test-project' });
    firestore = getFirestore(testApp);

    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        provideFirebaseApp(() => testApp), // Provide the test Firebase app
        provideFirestore(() => firestore), // Provide the test Firestore instance
        { provide: AbstractDataService, useExisting: FirestoreService }
      ]
    });
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
