import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/interfacess';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/register`, user);
  }

  // Update user (requires token)
  updateUser(user: Partial<User>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update`, user, { headers: getAuthHeaders() });
  }

  // Delete user by ID
  deleteUser(userId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/delete/${userId}`, {});
  }

  // Fetch a single user by ID
  fetchUser(userId: string): Observable<{ success: boolean, error?: string, message?: string, user?: User | unknown }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, user?: User | unknown }>(`${this.API_URL}/fetchOne/${userId}`);
  }

  // Fetch all users
  fetchUsers(): Observable<{ success: boolean, error?: string, message?: string, users?: User[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, users?: User[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Fetch all deleted users
  fetchDeletedUsers(): Observable<{ success: boolean, error?: string, message?: string, users?: User[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, users?: User[] | unknown[] }>(`${this.API_URL}/fetchAllDeleted`);
  }

  // Restore a deleted user by ID
  restoreDeletedUser(userId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/restoreDeleted/${userId}`, {});
  }
}

export const getAuthHeaders = ():HttpHeaders  => {
  let token = localStorage.getItem('authToken') as string;
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}