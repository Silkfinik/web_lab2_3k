import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service.model';
import { FirestoreService } from '../../services/firestore'; 

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-edit.html',
  styleUrl: './service-edit.css'
})
export class ServiceEdit implements OnInit {
  service: Service = { id: '', description: '', price: 0 }; 
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService 
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.firestoreService.getService(idParam).subscribe(service => { 
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
      this.firestoreService.updateService(this.service).then(() => { 
        this.router.navigate(['/services', this.service.id]);
      });
    } else {
      
      const { id, ...dataToAdd } = this.service;
      this.firestoreService.addService(dataToAdd).then(docRef => { 
        this.router.navigate(['/services', docRef.id]);
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
      this.firestoreService.deleteService(this.service.id).then(() => { 
        this.router.navigate(['/services']);
      });
    }
  }
}