import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interface';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  deletedUsers: User[] = [];
  searchTerm: string = '';
  showDeletedUsers: boolean = false;

  ngOnInit(): void {
    this.generateDummyData();
    this.filterUsers();
  }

  generateDummyData(): void {
    const dummyUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        phoneNumber: '(123) 456-7890',
        location: 'Engineering Building',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        isDeleted: false
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@university.edu',
        phoneNumber: '(234) 567-8901',
        location: 'Library',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        isDeleted: false
      },
      {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@university.edu',
        phoneNumber: '(345) 678-9012',
        location: 'Student Center',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        isDeleted: false
      },
      {
        id: 4,
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'e.williams@university.edu',
        phoneNumber: '(456) 789-0123',
        location: 'Science Lab',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        isDeleted: true
      },
      {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@university.edu',
        phoneNumber: '(567) 890-1234',
        location: 'Computer Lab',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        isDeleted: false
      },
      {
        id: 6,
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.d@university.edu',
        phoneNumber: '(678) 901-2345',
        location: 'Art Studio',
        image: 'https://randomuser.me/api/portraits/women/6.jpg',
        isDeleted: false
      },
      {
        id: 7,
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'r.miller@university.edu',
        phoneNumber: '(789) 012-3456',
        location: 'Gymnasium',
        image: 'https://randomuser.me/api/portraits/men/7.jpg',
        isDeleted: true
      }
    ];

    this.users = dummyUsers.filter(user => !user.isDeleted);
    this.deletedUsers = dummyUsers.filter(user => user.isDeleted);
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.location.toLowerCase().includes(term)
    );
  }

  softDeleteUser(userId: number): void {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const user = this.users[userIndex];
      user.isDeleted = true;
      this.users.splice(userIndex, 1);
      this.deletedUsers.push(user);
      this.filterUsers();
    }
  }

  restoreUser(userId: number): void {
    const userIndex = this.deletedUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const user = this.deletedUsers[userIndex];
      user.isDeleted = false;
      this.deletedUsers.splice(userIndex, 1);
      this.users.push(user);
      this.filterUsers();
    }
  }
}
