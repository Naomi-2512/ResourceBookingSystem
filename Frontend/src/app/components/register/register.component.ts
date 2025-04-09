import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { User } from '../../../interfaces/interfacess';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NotificationComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: Partial<User> = {
    userId: '', // Will generate a simple ID
    profileImage: '', // Will handle file input
    role: 'user', // Default to 'user' for demo
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    email: '',
    password: '',
    location: '',
    isDeleted: false,
    isWelcomed: false
  };
  confirmPassword: string = '';

  constructor(
    private ns: NotificationService,
    private router: Router
  ) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profileImage = reader.result as string; // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Basic validation
    if (this.user.password !== this.confirmPassword) {
      this.ns.showMessage('Passwords do not match', false);
      return;
    }

    // Generate a simple userId (for demo purposes)
    this.user.userId = 'user_' + Math.random().toString(36).substr(2, 9);

    // Simulate storing in "database" (localStorage)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and navigate
    this.ns.showMessage('Registration successful! Welcome aboard.', true);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000); // 2s delay for demo
  }
}
