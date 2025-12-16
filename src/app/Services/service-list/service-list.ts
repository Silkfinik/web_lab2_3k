import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Service } from '../service.model';
import { AbstractDataService } from '../services/abstract-data.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css'
})
export class ServiceList implements OnInit {
  services$!: Observable<Service[]>;
  errorMessage: string | null = null;

  constructor(private dataService: AbstractDataService) {}

  ngOnInit() {
    this.services$ = this.dataService.getServices().pipe(
      catchError(error => {
        console.error('Error loading services', error);
        this.errorMessage = 'Не удалось загрузить список услуг. Проверьте соединение с сервером (http://localhost:8080/api/services).';
        return of([]);
      })
    );
  }
}