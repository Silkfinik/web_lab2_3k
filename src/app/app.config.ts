import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { AbstractDataService } from './Services/services/abstract-data.service';
import { ServiceService } from './Services/services/service';
// import { FirestoreService } from './Services/services/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({ projectId: "telecom-app-e3f60", appId: "1:463157743889:web:7543b09d427368b127fcb0", storageBucket: "telecom-app-e3f60.firebasestorage.app", apiKey: "AIzaSyClHC50T73GfEIAaWUdsz91-xYnODb-Y4s", authDomain: "telecom-app-e3f60.firebaseapp.com", messagingSenderId: "463157743889", measurementId: "G-PNC0RD79QK"})),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    { provide: AbstractDataService, useClass: ServiceService }
    // { provide: AbstractDataService, useClass: FirestoreService }
  ]
};
