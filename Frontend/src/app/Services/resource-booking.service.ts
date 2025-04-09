import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceBooking, ReturnedResource } from '../../interfaces/interfacess';
import { getAuthHeaders } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceBookingService {
  API_URL: string = 'http://localhost:3000/api/resource-booking';

  constructor(private http: HttpClient) { }

  createResourceBook(resourceId: string, booking: ResourceBooking): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create/${resourceId}`, booking, { headers: getAuthHeaders() });
  }

  // Update a resource booking by ID
  updateResourceBook(bookId: string, booking: Partial<ResourceBooking>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update/${bookId}`, booking);
  }

  // Cancel a resource booking by ID
  cancelResourceBook(bookId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/cancel/${bookId}`, {});
  }

  // Approve a resource booking by ID
  approveBooking(bookId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/approve/${bookId}`, {});
  }

  // Return a resource booking
  returnResourceBook(returnDetails: ReturnedResource): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/return`, returnDetails);
  }

  // Fetch all resource bookings
  getAllResourceBookings(): Observable<{ success: boolean, error?: string, message?: string, bookings?: ResourceBooking[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, bookings?: ResourceBooking[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Fetch a single resource booking by ID
  getOneBook(bookId: string): Observable<{ success: boolean, error?: string, message?: string, booking?: ResourceBooking | unknown }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, booking?: ResourceBooking | unknown }>(`${this.API_URL}/fetchOne/${bookId}`);
  }

  // Fetch resource bookings by user ID (requires token)
  getResourceBookingsByUserId(): Observable<{ success: boolean, error?: string, message?: string, bookings?: ResourceBooking[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, bookings?: ResourceBooking[] | unknown[] }>(`${this.API_URL}/fetchByUser/`, { headers: getAuthHeaders() });
  }

  // Get booking statistics for a specific resource
  getBookStatistics(resourceId: string): Observable<{ success: boolean, error?: string, message?: string, statistics?: any }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, statistics?: any }>(`${this.API_URL}/getStatistics/${resourceId}`);
  }
}
