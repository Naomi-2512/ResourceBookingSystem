import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDetails, Recovery, RecoveryDetails } from '../../interfaces/interfacess';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }
  loginUser(loginDetails: LoginDetails): Observable<{  error?: string, message?: string, role?: string, token?: string }> {
    return this.http.post<{  error?: string, message?: string, role?: string, token?: string }>(`${this.API_URL}/login`, loginDetails);
  }

  // Change password
  changePassword(recoveryDetails: RecoveryDetails): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/change-password`, recoveryDetails);
  }

  // Get all recoveries
  getAllRecoveries(): Observable<{ success: boolean, error?: string, message?: string, recoveries?: Recovery[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, recoveries?: Recovery[] | unknown[] }>(`${this.API_URL}/recoveries`);
  }

  // Verify email
  verifyMail(email: string): Observable<{ success: boolean, error?: string, message?: string }> {
    const body = { email };
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/verify-email`, body);
  }

}
