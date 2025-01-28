import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-booked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-booked.component.html',
  styleUrl: './user-booked.component.css'
})
export class UserBookedComponent {
  resources = [
    {
      name: 'Projector',
      quantity: 3,
      returnDate: '2025-01-30',
      status: 'approved',
    },
    {
      name: 'Whiteboard',
      quantity: 10,
      returnDate: '2025-02-10',
      status: 'pending',
    },
    {
      name: 'Whiteboard',
      quantity: 10,
      returnDate: '2025-02-10',
      status: 'pending',
    },
    {
      name: 'Microphone',
      quantity: 5,
      returnDate: '2025-02-05',
      status: 'pending',
    },
    {
      name: 'Sound System',
      quantity: 2,
      returnDate: '2025-01-28',
      status: 'approved',
    },
    {
      name: 'Projector',
      quantity: 3,
      returnDate: '2025-01-30',
      status: 'approved',
    },
    {
      name: 'Projector',
      quantity: 3,
      returnDate: '2025-01-30',
      status: 'approved',
    },
    {
      name: 'Whiteboard',
      quantity: 10,
      returnDate: '2025-02-10',
      status: 'pending',
    },
  ];
}
