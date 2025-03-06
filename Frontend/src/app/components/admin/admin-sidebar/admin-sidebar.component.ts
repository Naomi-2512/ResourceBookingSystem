import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  isSidebarCollapsed: boolean = false;
  isMobileView: boolean = false;
  unreadMessages: number = 3; // Example value, replace with your actual data

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
      this.isSidebarCollapsed = true;
    } else if (window.innerWidth <= 1024) {
      this.isMobileView = false;
      this.isSidebarCollapsed = true;
    } else {
      this.isMobileView = false;
      this.isSidebarCollapsed = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeMobileSidebar(): void {
    if (this.isMobileView) {
      this.isSidebarCollapsed = true;
    }
  }

  logout(): void {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: this.authService.logout();
    this.router.navigate(['/login']);
  }
}






