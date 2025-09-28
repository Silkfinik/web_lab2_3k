
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service.model';
import { ServiceService } from '../services/service';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-edit.html',
  styleUrl: './service-edit.css'
})
export class ServiceEdit implements OnInit {
  service: Service = { id: 0, description: '', price: 0 };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.serviceService.getService(+idParam).subscribe(service => {
        if (service) {
          
          this.service = { ...service };
        }
      });
    } else {
      this.isEditMode = false;
      
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    if (this.isEditMode) {
      this.serviceService.updateService(this.service).subscribe(() => {
        this.router.navigate(['/services', this.service.id]);
      });
    } else {
      this.serviceService.addService(this.service).subscribe(newService => {
        this.router.navigate(['/services', newService.id]);
      });
    }
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['/services', this.service.id]);
    } else {
      this.router.navigate(['/services']);
    }
  }

  onDelete(): void {
    if (this.isEditMode && confirm(`Вы уверены, что хотите удалить "${this.service.description}"?`)) {
      this.serviceService.deleteService(this.service.id).subscribe(() => {
        this.router.navigate(['/services']);
      });
    }
  }
}