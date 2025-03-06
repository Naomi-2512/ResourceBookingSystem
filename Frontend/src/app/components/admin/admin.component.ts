import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminSidebarComponent,AdminTopbarComponent,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  showResourceForm: boolean = false;
  showCategoryForm: boolean = false;
  showVenueForm: boolean = false;
  
  // Sample data (replace with your actual data source)
  categories: any[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Office Supplies' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Toggle form visibility
  toggleForm(formType: string): void {
    this.closeAllForms(); // Close any open form first
    
    switch(formType) {
      case 'resource':
        this.showResourceForm = true;
        break;
      case 'category':
        this.showCategoryForm = true;
        break;
      case 'venue':
        this.showVenueForm = true;
        break;
    }
  }

  // Close all forms
  closeAllForms(): void {
    this.showResourceForm = false;
    this.showCategoryForm = false;
    this.showVenueForm = false;
  }
  
  // Close form when clicking outside (but not when clicking inside the form)
  closeForm(event: MouseEvent): void {
    if ((event.target as Element).className === 'modal-overlay') {
      this.closeAllForms();
    }
  }

  // Form submission handlers
  submitResourceForm(): void {
    // TODO: Implement your form submission logic here
    console.log('Resource form submitted');
    this.closeAllForms();
    // Here you would typically gather form data and send to your service
  }

  submitCategoryForm(): void {
    // TODO: Implement your form submission logic here
    console.log('Category form submitted');
    this.closeAllForms();
  }

  submitVenueForm(): void {
    // TODO: Implement your form submission logic here
    console.log('Venue form submitted');
    this.closeAllForms();
  }
}
