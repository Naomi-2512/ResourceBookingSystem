import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { AuthService } from '../../Services/auth.service';
import { LoginDetails } from '../../../interfaces/interfacess';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDetails: LoginDetails = { email: '', password: '' };
  rememberMe: boolean = false;

  constructor(
    private ns: NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    // Simulate backend login logic for presentation
    const { email, password } = this.loginDetails;

    // Hardcoded role logic (for demo purposes)
    if (email === 'naomichege2512@gmail.com' && password === '@Nakeez2512') {
      // Simulate admin login
      this.ns.showMessage('Welcome Admin!', true);
      localStorage.setItem('token', 'fake-admin-token'); // Fake token for demo
      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 4000); // Reduced to 2s for faster demo
    } else {
      // Simulate user login
      this.ns.showMessage('Welcome User!', true);
      localStorage.setItem('token', 'fake-user-token'); // Fake token for demo
      setTimeout(() => {
        this.router.navigate(['/user']);
      }, 4000); // Reduced to 2s for faster demo
    } 
  }
}
