import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, Resource, Venue } from '../../../../interfaces/interfacess';
import { NotificationService } from '../../../Services/notification.service';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-admin-resources',
  standalone: true,
  imports: [CommonModule,FormsModule,NotificationComponent],
  templateUrl: './admin-resources.component.html',
  styleUrl: './admin-resources.component.css'
})
export class AdminResourcesComponent implements OnInit {
  resources: Resource[] = [];
  venues: Venue[] = [];

  selectedResource: Resource | null = null;
  editingResource: Resource | null = null;
  editingVenue: Venue | null = null;
  showResourceDetails: boolean = false;
  showDeleteConfirm: boolean = false;
  itemToDelete: Resource | Venue | null = null;
  deleteType: 'resource' | 'venue' | null = null;

  constructor(private ns: NotificationService) {}

  ngOnInit(): void {
    this.loadResources();
    this.loadVenues();
    // Listen for storage changes (e.g., from AdminComponent)
    window.addEventListener('storage', () => {
      this.loadResources();
      this.loadVenues();
    });
  }

  // Load resources from localStorage
  loadResources(): void {
    const storedResources = JSON.parse(localStorage.getItem('resources') || '[]');
    if (storedResources.length === 0) {
      const defaultCategories: Category[] = [
        { categoryId: 'cat1', categoryName: 'Electronics' },
        { categoryId: 'cat2', categoryName: 'Furniture' }
      ];
      this.resources = [
        { 
          resourceId: 'res1', 
          name: 'Projector', 
          image: 'https://i.pinimg.com/736x/ae/ae/fd/aeaefdcfb0461bda9ef1c4627a3ea289.jpg', 
          Availability: true, 
          category: 'Electronics', 
          categoryId: 'cat1', 
          Quantity: 10, 
          remainingQuantity: 7, 
          status: 'Available',
          categories: defaultCategories[0]
        },
        { 
          resourceId: 'res2', 
          name: 'Laptop', 
          image: 'https://i.pinimg.com/236x/f1/e4/28/f1e4282d24cb5adb4ced0c8efb5e900e.jpg', 
          Availability: true, 
          category: 'Electronics', 
          categoryId: 'cat1', 
          Quantity: 20, 
          remainingQuantity: 5, 
          status: 'Available',
          categories: defaultCategories[0]
        },
        { 
          resourceId: 'res3', 
          name: 'Conference Room Chair', 
          image: 'https://i.pinimg.com/236x/b0/bd/23/b0bd23b6918d0c7030005ffec83493a0.jpg', 
          Availability: true, 
          category: 'Furniture', 
          categoryId: 'cat2', 
          Quantity: 50, 
          remainingQuantity: 20, 
          status: 'Available',
          categories: defaultCategories[1]
        }
      ];
      localStorage.setItem('resources', JSON.stringify(this.resources));
    } else {
      this.resources = storedResources;
    }
  }

  // Load venues from localStorage
  loadVenues(): void {
    const storedVenues = JSON.parse(localStorage.getItem('venues') || '[]');
    if (storedVenues.length === 0) {
      this.venues = [
        { venueId: 'ven1', name: 'Main Auditorium', Image: 'assets/images/auditorium.jpg', Availability: true },
        { venueId: 'ven2', name: 'Conference Room A', Image: 'https://i.pinimg.com/736x/57/a8/80/57a880e3731b82319f8be23777abf255.jpg', Availability: true },
        { venueId: 'ven3', name: 'Lecture Hall B', Image: 'assets/images/lecture-hall.jpg', Availability: true }
      ];
      localStorage.setItem('venues', JSON.stringify(this.venues));
    } else {
      this.venues = storedVenues;
    }
  }

  viewResource(resource: Resource): void {
    this.selectedResource = resource;
    this.showResourceDetails = true;
    this.editingResource = null;
    this.editingVenue = null;
  }

  editResource(resource: Resource): void {
    this.editingResource = { ...resource };
    this.showResourceDetails = false;
    this.selectedResource = null;
    this.editingVenue = null;
  }

  saveResourceEdit(event: Event): void {
    event.preventDefault();
    if (this.editingResource) {
      const index = this.resources.findIndex(r => r.resourceId === this.editingResource!.resourceId);
      if (index !== -1) {
        const booked = this.resources[index].Quantity - this.resources[index].remainingQuantity;
        this.editingResource.remainingQuantity = this.editingResource.Quantity - booked;
        this.editingResource.categories.categoryName = this.editingResource.category;
        this.resources[index] = { ...this.editingResource };
        localStorage.setItem('resources', JSON.stringify(this.resources));
        this.ns.showMessage(`Resource "${this.editingResource.name}" updated successfully`, true);
        this.editingResource = null;
      }
    }
  }

  confirmDelete(item: Resource | Venue, type: 'resource' | 'venue'): void {
    this.itemToDelete = item;
    this.deleteType = type;
    this.showDeleteConfirm = true;
  }

  deleteConfirmed(): void {
    if (this.itemToDelete && this.deleteType) {
      if (this.deleteType === 'resource') {
        const resource = this.itemToDelete as Resource;
        this.resources = this.resources.filter(r => r.resourceId !== resource.resourceId);
        localStorage.setItem('resources', JSON.stringify(this.resources));
        this.ns.showMessage(`Resource "${resource.name}" deleted successfully`, true);
      } else if (this.deleteType === 'venue') {
        const venue = this.itemToDelete as Venue;
        this.venues = this.venues.filter(v => v.venueId !== venue.venueId);
        localStorage.setItem('venues', JSON.stringify(this.venues));
        this.ns.showMessage(`Venue "${venue.name}" deleted successfully`, true);
      }
      this.showResourceDetails = false;
      this.editingResource = null;
      this.editingVenue = null;
      this.closeDeleteConfirm();
    }
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.itemToDelete = null;
    this.deleteType = null;
  }

  cancelResourceEdit(): void {
    this.editingResource = null;
  }

  editVenue(venue: Venue): void {
    this.editingVenue = { ...venue };
    this.showResourceDetails = false;
    this.selectedResource = null;
    this.editingResource = null;
  }

  saveVenueEdit(event: Event): void {
    event.preventDefault();
    if (this.editingVenue) {
      const index = this.venues.findIndex(v => v.venueId === this.editingVenue!.venueId);
      if (index !== -1) {
        this.venues[index] = { ...this.editingVenue };
        localStorage.setItem('venues', JSON.stringify(this.venues));
        this.ns.showMessage(`Venue "${this.editingVenue.name}" updated successfully`, true);
        this.editingVenue = null;
      }
    }
  }

  cancelVenueEdit(): void {
    this.editingVenue = null;
  }
}
