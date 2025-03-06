import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user: User = {
      id: 1,
      isDeleted:false,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@university.edu',
      phoneNumber: '(123) 456-7890',
      location: 'Engineering Building',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
  
    profileForm!: FormGroup;
    isEditMode: boolean = false;
  
    constructor(private fb: FormBuilder) { }
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.profileForm = this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        phoneNumber: [this.user.phoneNumber, Validators.required],
        location: [this.user.location, Validators.required]
      });
    }
  
    toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
      
      if (this.isEditMode) {
        this.initForm();
      }
    }
  
    onImageChange(event: any): void {
      const file = event.target.files[0];
      if (file) {
        // In a real application, you would upload the file to a server
        // For now, we'll just create a local URL
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.user.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    saveProfile(): void {
      if (this.profileForm.valid) {
        // Update user object with form values
        this.user = {
          ...this.user,
          ...this.profileForm.value
        };
        
        // In a real application, you would send this data to your backend
        console.log('Profile updated:', this.user);
        
        this.toggleEditMode();
      } else {
        this.profileForm.markAllAsTouched();
      }
    }
}
