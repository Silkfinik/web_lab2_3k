import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Service } from '../service.model';
import { FirestoreService } from '../../services/firestore'; 

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css'
})
export class ServiceDetails implements OnInit {
  service$!: Observable<Service | undefined>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService 
  ) {}

  ngOnInit() {
    this.service$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.firestoreService.getService(id); 
      })
    );
  }
}