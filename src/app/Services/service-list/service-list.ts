import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { Service } from '../service.model';
import { ServiceService } from '../services/service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css'
})
  
export class ServiceList implements OnInit{
  services$!: Observable<Service[]>;

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.services$ = this.serviceService.getServices();
  }
}
