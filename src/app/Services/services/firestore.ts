import { Injectable, inject } from '@angular/core'; 
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Service } from '../service.model'; 
import { AbstractDataService } from './abstract-data.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService extends AbstractDataService {
  
  private firestore: Firestore = inject(Firestore);
  
  private servicesCollection = collection(this.firestore, 'list-subjects');

  constructor() {
    super();
  }

  getServices(): Observable<Service[]> {
    return collectionData(this.servicesCollection, { idField: 'id' }) as Observable<Service[]>;
  }

  getService(id: string): Observable<Service> {
    const serviceDoc = doc(this.firestore, `list-subjects/${id}`);
    return docData(serviceDoc, { idField: 'id' }) as Observable<Service>;
  }

  addService(service: Omit<Service, 'id'>): Observable<DocumentReference> {
    return from(addDoc(this.servicesCollection, service));
  }

  updateService(service: Service): Observable<void> {
    const serviceDoc = doc(this.firestore, `list-subjects/${service.id}`);
    const { id, ...dataToUpdate } = service;
    return from(updateDoc(serviceDoc, dataToUpdate));
  }

  deleteService(id: string): Observable<void> {
    const serviceDoc = doc(this.firestore, `list-subjects/${id}`);
    return from(deleteDoc(serviceDoc));
  }
}

export { Firestore };
