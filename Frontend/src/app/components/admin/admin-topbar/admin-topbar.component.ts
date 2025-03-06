import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.css'
})
export class AdminTopbarComponent implements OnInit {
  notifications: Notification[] = [];
  notificationCount: number = 0;
  hasUnreadNotifications: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Mock notifications - replace with your real data source
    this.notifications = [
      {
        id: 1,
        message: 'New booking request received',
        time: '5 min ago',
        read: false,
        type: 'info'
      },
      {
        id: 2,
        message: 'Resource added successfully',
        time: '1 hour ago',
        read: true,
        type: 'success'
      },
      {
        id: 3,
        message: 'Venue "Conference Room B" is almost fully booked',
        time: '3 hours ago',
        read: false,
        type: 'warning'
      },
      {
        id: 4,
        message: 'Failed to upload image. Please try again.',
        time: 'Yesterday',
        read: true,
        type: 'error'
      }
    ];

    this.updateNotificationCount();
  }

  updateNotificationCount(): void {
    this.notificationCount = this.notifications.filter(n => !n.read).length;
    this.hasUnreadNotifications = this.notificationCount > 0;
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.updateNotificationCount();
  }

  getNotificationIcon(type: string): string {
    switch(type) {
      case 'info': return 'bx-info-circle';
      case 'success': return 'bx-check-circle';
      case 'warning': return 'bx-error';
      case 'error': return 'bx-x-circle';
      default: return 'bx-bell';
    }
  }

  logout(): void {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: this.authService.logout();
    this.router.navigate(['/login']);
  }
}
