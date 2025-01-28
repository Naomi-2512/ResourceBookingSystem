import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  profiles = [
    {
      image: 'https://th.bing.com/th/id/OIP.ZLM7ThTbMdjDyCTm1sLO2QHaLE?w=184&h=275&c=7&r=0&o=5&pid=1.7',
      name: 'Yvonne Irani Rana',
      location: 'Nairobi, Kenya',
      email: 'yvone@gmail.com',
      phone1: '+254712345678',
      phone2: '+254798765432',
    },
  ]
}
