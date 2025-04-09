import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../Services/notification.service';
import { Category, Resource, Venue } from '../../../interfaces/interfacess';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminSidebarComponent,AdminTopbarComponent,RouterOutlet,FormsModule,CommonModule,NotificationComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  showResourceForm: boolean = false;
  showCategoryForm: boolean = false;
  showVenueForm: boolean = false;

  // Form data models with image as string (URL)
  newResource: Partial<Resource> = {
    resourceId: '',
    name: '',
    image: '', // Now a URL string
    Availability: true,
    category: '',
    categoryId: '',
    Quantity: 0,
    remainingQuantity: 0,
    status: 'Available',
    categories: { categoryId: '', categoryName: '' }
  };
  newCategory: Category = { categoryId: '', categoryName: '' };
  newVenue: Partial<Venue> = { venueId: '', name: '', Image: '', Availability: true }; // Image as URL string

  categories: Category[] = [];

  constructor(private ns: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load categories from localStorage
  loadCategories(): void {
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    if (storedCategories.length === 0) {
      this.categories = [
        { categoryId: 'cat1', categoryName: 'Electronics' },
        { categoryId: 'cat2', categoryName: 'Furniture' },
        { categoryId: 'cat3', categoryName: 'Office Supplies' }
      ];
      localStorage.setItem('categories', JSON.stringify(this.categories));
    } else {
      this.categories = storedCategories;
    }
  }

  // Toggle form visibility
  toggleForm(formType: string): void {
    this.closeAllForms();
    switch (formType) {
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
    // Reset form data
    this.newResource = { resourceId: '', name: '', image: '', Availability: true, category: '', categoryId: '', Quantity: 0, remainingQuantity: 0, status: 'Available', categories: { categoryId: '', categoryName: '' } };
    this.newCategory = { categoryId: '', categoryName: '' };
    this.newVenue = { venueId: '', name: '', Image: '', Availability: true };
  }

  // Close form when clicking outside
  closeForm(event: MouseEvent): void {
    if ((event.target as Element).className === 'modal-overlay') {
      this.closeAllForms();
    }
  }

  // Submit resource form
  submitResourceForm(event: Event): void {
    event.preventDefault();
    if (!this.newResource.name || !this.newResource.categoryId || this.newResource.Quantity! < 0) {
      this.ns.showMessage('Please fill all required fields correctly', false);
      return;
    }
    this.newResource.resourceId = 'res_' + Math.random().toString(36).substr(2, 9);
    this.newResource.remainingQuantity = this.newResource.Quantity; // Initially all available
    const selectedCategory = this.categories.find(cat => cat.categoryId === this.newResource.categoryId);
    if (selectedCategory) {
      this.newResource.category = selectedCategory.categoryName;
      this.newResource.categories = selectedCategory;
    }
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    resources.push(this.newResource);
    localStorage.setItem('resources', JSON.stringify(resources));
    this.ns.showMessage(`Resource "${this.newResource.name}" added successfully`, true);
    setTimeout(() => this.closeAllForms(), 2000);
  }

  // Submit category form
  submitCategoryForm(event: Event): void {
    event.preventDefault();
    if (!this.newCategory.categoryName) {
      this.ns.showMessage('Please enter a category name', false);
      return;
    }
    this.newCategory.categoryId = 'cat_' + Math.random().toString(36).substr(2, 9);
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(this.newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categories = categories; // Update local list
    this.ns.showMessage(`Category "${this.newCategory.categoryName}" added successfully`, true);
    setTimeout(() => this.closeAllForms(), 2000);
  }

  // Submit venue form
  submitVenueForm(event: Event): void {
    event.preventDefault();
    if (!this.newVenue.name) {
      this.ns.showMessage('Please enter a venue name', false);
      return;
    }
    this.newVenue.venueId = 'ven_' + Math.random().toString(36).substr(2, 9);
    const venues = JSON.parse(localStorage.getItem('venues') || '[]');
    venues.push(this.newVenue);
    localStorage.setItem('venues', JSON.stringify(venues));
    this.ns.showMessage(`Venue "${this.newVenue.name}" added successfully`, true);
    setTimeout(() => this.closeAllForms(), 2000);
  }
}
