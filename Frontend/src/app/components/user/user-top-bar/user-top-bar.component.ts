import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-top-bar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './user-top-bar.component.html',
  styleUrl: './user-top-bar.component.css'
})
export class UserTopBarComponent {

}
