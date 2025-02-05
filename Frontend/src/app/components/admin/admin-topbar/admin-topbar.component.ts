import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.css'
})
export class AdminTopbarComponent {

}
