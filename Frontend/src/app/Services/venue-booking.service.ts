import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue, VenueBooking } from '../../interfaces/interfacess';
import { HttpClient } from '@angular/common/http';
import { getAuthHeaders } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VenueBookingService {
  API_URL: string = 'http://localhost:3000/api/venue-booking';

  constructor(private http: HttpClient) { }
    createVenueBookings(venueId: string, booking: VenueBooking): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create/${venueId}`, booking);
  }

  // Update a venue booking by ID
  updateVenueBook(bookId: string, booking: Partial<VenueBooking>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update/${bookId}`, booking);
  }

  // Cancel a venue booking by ID
  cancelBooking(bookId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/cancel/${bookId}`, {});
  }

  // Approve a venue booking by ID
  approveBooking(bookId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/approve/${bookId}`, {});
  }

  // Fetch all venue bookings by date
  getVenueBookingsByDate(): Observable<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }>(`${this.API_URL}/fetchAllByDate`);
  }

  // Fetch venue bookings by venue ID
  getVenueBookingsByVenueId(venueId: string): Observable<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }>(`${this.API_URL}/fetchByVenueId/${venueId}`);
  }

  // Fetch venue bookings by user ID (requires token)
  getVenueBookingsByUserId(): Observable<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, bookings?: VenueBooking[] | unknown[] }>(`${this.API_URL}/fetchByUser/`, { headers: getAuthHeaders() });
  }
  
}
