import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-resources.component.html',
  styleUrl: './user-resources.component.css'
})
export class UserResourcesComponent {
  resources = [
    {
      id: 1,
      name: 'Screen',
      image: 'https://i.pinimg.com/236x/f1/e4/28/f1e4282d24cb5adb4ced0c8efb5e900e.jpg',
    },
    {
      id: 2,
      name: 'Chair',
      image: 'https://i.pinimg.com/236x/b0/bd/23/b0bd23b6918d0c7030005ffec83493a0.jpg',
    },
    {
      id: 3,
      name: 'Projector',
      image: 'https://i.pinimg.com/736x/ae/ae/fd/aeaefdcfb0461bda9ef1c4627a3ea289.jpg',
    },
    {
      id: 4,
      name: 'Conference Room',
      image: 'https://i.pinimg.com/736x/57/a8/80/57a880e3731b82319f8be23777abf255.jpg',
    },
  ];
}
