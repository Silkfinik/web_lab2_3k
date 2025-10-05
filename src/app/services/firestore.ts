import { Injectable, inject } from '@angular/core'; 
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Service } from '../Services/service.model'; 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  private firestore: Firestore = inject(Firestore);
  
  private servicesCollection = collection(this.firestore, 'list-subjects');

  constructor() { }

  getServices(): Observable<Service[]> {
    return collectionData(this.servicesCollection, { idField: 'id' }) as Observable<Service[]>;
  }

  getService(id: string): Observable<Service> {
    const serviceDoc = doc(this.firestore, `list-subjects/${id}`);
    return docData(serviceDoc, { idField: 'id' }) as Observable<Service>;
  }

  addService(service: Omit<Service, 'id'>): Promise<DocumentReference> {
    return addDoc(this.servicesCollection, service);
  }

  updateService(service: Service): Promise<void> {
    const serviceDoc = doc(this.firestore, `list-subjects/${service.id}`);
    const { id, ...dataToUpdate } = service;
    return updateDoc(serviceDoc, dataToUpdate);
  }

  deleteService(id: string): Promise<void> {
    const serviceDoc = doc(this.firestore, `list-subjects/${id}`);
    return deleteDoc(serviceDoc);
  }
}

export { Firestore };
