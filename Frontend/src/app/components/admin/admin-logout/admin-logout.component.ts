import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent {
 

  constructor(private router: Router) { }

  // Method to be called when logout button is clicked
  openLogoutConfirmation(): void {
  }

  cancelLogout(): void {
    // Navigate back to resources component
    this.router.navigate(['resources']);
  }

  confirmLogout(): void {
    // Here you would typically call your auth service to clear tokens/session
    // For example: this.authService.logout();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
