import { Component } from '@angular/core';
import { UserTopBarComponent } from "./user-top-bar/user-top-bar.component";
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserTopBarComponent, UserSideBarComponent,RouterLink,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
