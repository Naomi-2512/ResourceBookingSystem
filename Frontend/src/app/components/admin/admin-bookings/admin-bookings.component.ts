import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  phoneNumber: string;
  profilePicture: string;
}

interface ResourceBooking {
  id: number;
  resourceName: string;
  quantityBooked: number;
  dateBooked: string;
  returnDate: string;
  userName: string;
  user: User;
  isApproved: boolean;
}

interface VenueBooking {
  id: number;
  venueName: string;
  dateBooked: string;
  startTime: string;
  duration: number;
  userName: string;
  user: User;
  isApproved: boolean;
}

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent implements OnInit{
  resourceBookings: ResourceBooking[] = [];
  venueBookings: VenueBooking[] = [];
  selectedUser: User | null = null;
  showUserModal = false;

  constructor() { }

  ngOnInit(): void {
    this.loadDummyData();
  }

  loadDummyData(): void {
    // Dummy users
    const users: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@university.edu',
        department: 'Computer Science',
        role: 'Student',
        phoneNumber: '123-456-7890',
        profilePicture: 'https://th.bing.com/th/id/R.0301819f445a8855c4a577a6763fb62d?rik=TT%2fgaYZuz1YEig&riu=http%3a%2f%2fanhede.se%2fwp-content%2fuploads%2f2014%2f01%2f130221-2528.jpg&ehk=LToqkipED3KxGj7CVuMoQrvi487RY2HN6IPZ59FCWNQ%3d&risl=&pid=ImgRaw&r=0'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        department: 'Engineering',
        role: 'Faculty',
        phoneNumber: '987-654-3210',
        profilePicture: 'https://th.bing.com/th/id/R.0301819f445a8855c4a577a6763fb62d?rik=TT%2fgaYZuz1YEig&riu=http%3a%2f%2fanhede.se%2fwp-content%2fuploads%2f2014%2f01%2f130221-2528.jpg&ehk=LToqkipED3KxGj7CVuMoQrvi487RY2HN6IPZ59FCWNQ%3d&risl=&pid=ImgRaw&r=0'
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@university.edu',
        department: 'Business',
        role: 'Staff',
        phoneNumber: '555-123-4567',
        profilePicture: 'https://th.bing.com/th/id/OIP.HjCo-okyESGl53iCiO8udQHaHa?pid=ImgDet&w=474&h=474&rs=1'
      }
    ];

    // Dummy resource bookings
    this.resourceBookings = [
      {
        id: 101,
        resourceName: 'Laptop Dell XPS',
        quantityBooked: 2,
        dateBooked: '2025-02-15',
        returnDate: '2025-02-20',
        userName: 'John Doe',
        user: users[0],
        isApproved: false
      },
      {
        id: 102,
        resourceName: 'Projector HD1080p',
        quantityBooked: 1,
        dateBooked: '2025-02-16',
        returnDate: '2025-02-17',
        userName: 'Jane Smith',
        user: users[1],
        isApproved: false
      },
      {
        id: 103,
        resourceName: 'Conference Phone',
        quantityBooked: 1,
        dateBooked: '2025-02-18',
        returnDate: '2025-02-19',
        userName: 'Robert Johnson',
        user: users[2],
        isApproved: false
      }
    ];

    // Dummy venue bookings
    this.venueBookings = [
      {
        id: 201,
        venueName: 'Conference Room A',
        dateBooked: '2025-02-16',
        startTime: '10:00 AM',
        duration: 2,
        userName: 'John Doe',
        user: users[0],
        isApproved: false
      },
      {
        id: 202,
        venueName: 'Auditorium',
        dateBooked: '2025-02-17',
        startTime: '2:00 PM',
        duration: 3,
        userName: 'Jane Smith',
        user: users[1],
        isApproved: false
      },
      {
        id: 203,
        venueName: 'Meeting Room 202',
        dateBooked: '2025-02-19',
        startTime: '9:00 AM',
        duration: 1,
        userName: 'Robert Johnson',
        user: users[2],
        isApproved: false
      }
    ];
  }

  showUserDetails(user: User): void {
    this.selectedUser = user;
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.selectedUser = null;
  }

  // Placeholder functions for your existing methods
  approveResourceBooking(booking: ResourceBooking): void {
    booking.isApproved = true;
    // Your actual implementation will call the backend
  }

  approveVenueBooking(booking: VenueBooking): void {
    booking.isApproved = true;
    // Your actual implementation will call the backend
  }
}
