import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-resources',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-resources.component.html',
  styleUrl: './admin-resources.component.css'
})
export class AdminResourcesComponent implements OnInit {
  resources = [
    { id: 1, name: 'Projector', image: 'https://i.pinimg.com/736x/ae/ae/fd/aeaefdcfb0461bda9ef1c4627a3ea289.jpg', quantity: 10, booked: 3, remaining: 7, category: 'Electronics' },
    { id: 2, name: 'Laptop', image: 'https://i.pinimg.com/236x/f1/e4/28/f1e4282d24cb5adb4ced0c8efb5e900e.jpg', quantity: 20, booked: 15, remaining: 5, category: 'Electronics' },
    { id: 3, name: 'Conference Room Chair', image: 'https://i.pinimg.com/236x/b0/bd/23/b0bd23b6918d0c7030005ffec83493a0.jpg', quantity: 50, booked: 30, remaining: 20, category: 'Furniture' }
  ];

  // Dummy data for venues
  venues = [
    { id: 1, name: 'Main Auditorium', image: 'assets/images/auditorium.jpg' },
    { id: 2, name: 'Conference Room A', image: 'https://i.pinimg.com/736x/57/a8/80/57a880e3731b82319f8be23777abf255.jpg' },
    { id: 3, name: 'Lecture Hall B', image: 'assets/images/lecture-hall.jpg' }
  ];

  selectedResource: any = null;
  editingResource: any = null;
  editingVenue: any = null;
  showResourceDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  viewResource(resource: any): void {
    this.selectedResource = resource;
    this.showResourceDetails = true;
    this.editingResource = null;
    this.editingVenue = null;
  }

  editResource(resource: any): void {
    this.editingResource = { ...resource };
    this.showResourceDetails = false;
    this.selectedResource = null;
    this.editingVenue = null;
  }

  cancelResourceEdit(): void {
    this.editingResource = null;
  }

  editVenue(venue: any): void {
    this.editingVenue = { ...venue };
    this.showResourceDetails = false;
    this.selectedResource = null;
    this.editingResource = null;
  }

  cancelVenueEdit(): void {
    this.editingVenue = null;
  }
}
