import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-side-bar.component.html',
  styleUrl: './user-side-bar.component.css'
})
export class UserSideBarComponent {

}
