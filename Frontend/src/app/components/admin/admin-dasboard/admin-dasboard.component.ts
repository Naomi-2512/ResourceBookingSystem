import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

interface Booking {
  id: number;
  resourceId: number;
  user: User;
  quantity: number;
  dateBooked: Date;
  returnDate: Date;
  status: 'active' | 'pending' | 'returned';
}

interface Resource {
  id: number;
  name: string;
  type: string;
  quantity: number;
}

@Component({
  selector: 'app-admin-dasboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dasboard.component.html',
  styleUrl: './admin-dasboard.component.css'
})
export class AdminDasboardComponent implements OnInit {
  resources: Resource[] = [];
  bookings: Booking[] = [];
  selectedResource: Resource | null = null;
  totalResources: number = 0;
  totalBookings: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.generateDummyData();
    this.totalResources = this.resources.length;
    this.totalBookings = this.bookings.filter(b => b.status === 'active').length;
  }

  generateDummyData(): void {
    // Dummy resource data
    this.resources = [
      { id: 1, name: 'Projector HD-1080p', type: 'Projector', quantity: 15 },
      { id: 2, name: 'Ergonomic Chairs', type: 'Furniture', quantity: 50 },
      { id: 3, name: 'Laptop Screens', type: 'Screen', quantity: 25 },
      { id: 4, name: 'Extension Cords', type: 'Electrical', quantity: 30 },
      { id: 5, name: 'Conference Room A', type: 'Room', quantity: 1 },
      { id: 6, name: 'Wireless Mics', type: 'Audio', quantity: 10 }
    ];

    // Dummy booking data
    this.bookings = [
      {
        id: 1,
        resourceId: 1,
        user: { id: 101, firstName: 'John', lastName: 'Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        quantity: 2,
        dateBooked: new Date(2023, 5, 15),
        returnDate: new Date(2023, 5, 20),
        status: 'active'
      },
      {
        id: 2,
        resourceId: 1,
        user: { id: 102, firstName: 'Jane', lastName: 'Smith', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        quantity: 1,
        dateBooked: new Date(2023, 5, 16),
        returnDate: new Date(2023, 5, 22),
        status: 'active'
      },
      {
        id: 3,
        resourceId: 2,
        user: { id: 103, firstName: 'Mike', lastName: 'Johnson', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        quantity: 10,
        dateBooked: new Date(2023, 5, 10),
        returnDate: new Date(2023, 5, 25),
        status: 'active'
      },
      {
        id: 4,
        resourceId: 3,
        user: { id: 104, firstName: 'Emily', lastName: 'Brown', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        quantity: 5,
        dateBooked: new Date(2023, 5, 12),
        returnDate: new Date(2023, 5, 18),
        status: 'returned'
      },
      {
        id: 5,
        resourceId: 4,
        user: { id: 105, firstName: 'Alex', lastName: 'Wilson', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        quantity: 8,
        dateBooked: new Date(2023, 5, 14),
        returnDate: new Date(2023, 5, 21),
        status: 'pending'
      }
    ];
  }

  selectResource(resource: Resource): void {
    this.selectedResource = resource;
  }

  getResourceIcon(type: string): string {
    const iconMap: {[key: string]: string} = {
      'Projector': 'fa-projector',
      'Furniture': 'fa-chair',
      'Screen': 'fa-desktop',
      'Electrical': 'fa-plug',
      'Room': 'fa-door-open',
      'Audio': 'fa-microphone'
    };
    
    return iconMap[type] || 'fa-box';
  }

  getResourceBookings(resourceId: number): Booking[] {
    return this.bookings.filter(booking => booking.resourceId === resourceId);
  }

  getBookedQuantity(resourceId: number): number {
    return this.getResourceBookings(resourceId)
      .filter(booking => booking.status === 'active' || booking.status === 'pending')
      .reduce((total, booking) => total + booking.quantity, 0);
  }

  getRemainingQuantity(resourceId: number): number {
    const resource = this.resources.find(r => r.id === resourceId);
    if (!resource) return 0;
    return resource.quantity - this.getBookedQuantity(resourceId);
  }
}
