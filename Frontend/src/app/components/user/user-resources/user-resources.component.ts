import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Resource, ResourceBooking, Venue, VenueBooking } from '../../../../interfaces/interfacess';
import { NotificationService } from '../../../Services/notification.service';
import { NotificationComponent } from "../../notification/notification.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-resources',
  standalone: true,
  imports: [CommonModule, NotificationComponent,FormsModule],
  templateUrl: './user-resources.component.html',
  styleUrl: './user-resources.component.css'
})
export class UserResourcesComponent {
  resources: Resource[] = [];
  venues: Venue[] = [];
  selectedItem: Resource | Venue | null = null;
  showDetailsModal: boolean = false;
  showBookingForm: boolean = false;
  viewMode: 'resources' | 'venues' = 'resources';

  // Booking form models based on your interfaces
  resourceBooking: Partial<ResourceBooking> = {
    bookId: '',
    userId: 'user1', // Dummy, replace with auth
    resourceId: '',
    quantity: 1,
    dateBooked: new Date(),
    userReturnDate: new Date(),
    actualReturnDate: new Date(),
    isApproved: false,
    isReturned: false,
    isCancelled: false,
    User: { userId: 'user1', firstName: 'Current', lastName: 'User', email: 'user@example.com', password: '', profileImage: '', role: 'User', phone1: '', phone2: '', location: '', isDeleted: false, isWelcomed: false }
  };
  venueBooking: Partial<VenueBooking> = {
    bookId: '',
    userId: 'user1', // Dummy, replace with auth
    venueId: '',
    isApproved: false,
    isCancelled: false,
    dateBooked: new Date(),
    startTime: new Date(),
    duration: 1,
    User: { userId: 'user1', firstName: 'Current', lastName: 'User', email: 'user@example.com', password: '', profileImage: '', role: 'User', phone1: '', phone2: '', location: '', isDeleted: false, isWelcomed: false }
  };

  constructor(private ns: NotificationService) {}

  ngOnInit(): void {
    this.loadResources();
    this.loadVenues();
    window.addEventListener('storage', () => {
      this.loadResources();
      this.loadVenues();
    });
  }

  loadResources(): void {
    this.resources = JSON.parse(localStorage.getItem('resources') || '[]');
  }

  loadVenues(): void {
    this.venues = JSON.parse(localStorage.getItem('venues') || '[]');
  }

  toggleView(mode: 'resources' | 'venues'): void {
    this.viewMode = mode;
    this.closeDetailsModal();
    this.closeBookingForm();
  }

  showDetails(item: Resource | Venue): void {
    this.selectedItem = item;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedItem = null;
  }

  showBookingFormFor(item: Resource | Venue): void {
    if ('resourceId' in item) {
      this.resourceBooking = {
        bookId: 'book_' + Math.random().toString(36).substr(2, 9),
        userId: 'user1',
        resourceId: item.resourceId,
        quantity: 1,
        dateBooked: new Date(),
        userReturnDate: new Date(),
        actualReturnDate: new Date(),
        isApproved: false,
        isReturned: false,
        isCancelled: false,
        User: { userId: 'user1', firstName: 'Current', lastName: 'User', email: 'user@example.com', password: '', profileImage: '', role: 'User', phone1: '', phone2: '', location: '', isDeleted: false, isWelcomed: false }
      };
    } else {
      this.venueBooking = {
        bookId: 'book_' + Math.random().toString(36).substr(2, 9),
        userId: 'user1',
        venueId: item.venueId,
        isApproved: false,
        isCancelled: false,
        dateBooked: new Date(),
        startTime: new Date(),
        duration: 1,
        User: { userId: 'user1', firstName: 'Current', lastName: 'User', email: 'user@example.com', password: '', profileImage: '', role: 'User', phone1: '', phone2: '', location: '', isDeleted: false, isWelcomed: false }
      };
    }
    this.selectedItem = item;
    this.showBookingForm = true;
  }

  closeBookingForm(): void {
    this.showBookingForm = false;
    this.selectedItem = null;
  }

  submitBooking(event: Event): void {
    event.preventDefault();
    if (this.selectedItem) {
      if ('resourceId' in this.selectedItem) {
        const resource = this.selectedItem as Resource;
        if (this.resourceBooking.quantity! > resource.remainingQuantity || this.resourceBooking.quantity! <= 0) {
          this.ns.showMessage(`Invalid quantity for "${resource.name}"`, false);
          return;
        }
        if (!this.resourceBooking.dateBooked || !this.resourceBooking.userReturnDate) {
          this.ns.showMessage('Please fill all required fields', false);
          return;
        }

        const bookings = JSON.parse(localStorage.getItem('resourceBookings') || '[]');
        bookings.push(this.resourceBooking);
        localStorage.setItem('resourceBookings', JSON.stringify(bookings));

        resource.remainingQuantity -= this.resourceBooking.quantity!;
        resource.Availability = resource.remainingQuantity > 0;
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        const index = resources.findIndex((r: Resource) => r.resourceId === resource.resourceId);
        if (index !== -1) resources[index] = resource;
        localStorage.setItem('resources', JSON.stringify(resources));
        this.loadResources();

        this.ns.showMessage(`"${resource.name}" booked successfully`, true);
      } else {
        const venue = this.selectedItem as Venue;
        if (!venue.Availability) {
          this.ns.showMessage(`"${venue.name}" is not available`, false);
          return;
        }
        if (!this.venueBooking.dateBooked || !this.venueBooking.startTime || this.venueBooking.duration! <= 0) {
          this.ns.showMessage('Please fill all required fields', false);
          return;
        }

        const bookings = JSON.parse(localStorage.getItem('venueBookings') || '[]');
        bookings.push(this.venueBooking);
        localStorage.setItem('venueBookings', JSON.stringify(bookings));

        venue.Availability = false;
        const venues = JSON.parse(localStorage.getItem('venues') || '[]');
        const index = venues.findIndex((v: Venue) => v.venueId === venue.venueId);
        if (index !== -1) venues[index] = venue;
        localStorage.setItem('venues', JSON.stringify(venues));
        this.loadVenues();

        this.ns.showMessage(`"${venue.name}" booked successfully`, true);
      }
      this.closeBookingForm();
    }
  }

  isResource(item: Resource | Venue): item is Resource {
    return 'resourceId' in item;
  }

  isVenue(item: Resource | Venue): item is Venue {
    return 'venueId' in item;
  }
}
