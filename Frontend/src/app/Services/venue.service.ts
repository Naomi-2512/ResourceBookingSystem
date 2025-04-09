import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from '../../interfaces/interfacess';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  API_URL: string = 'http://localhost:3000/api/venue';

  constructor(private http: HttpClient) { }

  createVenue(venue: Venue): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create`, venue);
  }

  // Update a venue by ID
  updateVenue(venueId: string, venue: Partial<Venue>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update/${venueId}`, venue);
  }

  // Fetch all venues
  fetchVenues(): Observable<{ success: boolean, error?: string, message?: string, venues?: Venue[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, venues?: Venue[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Fetch a single venue by ID
  fetchOneVenue(venueId: string): Observable<{ success: boolean, error?: string, message?: string, venue?: Venue | unknown }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, venue?: Venue | unknown }>(`${this.API_URL}/fetchOne/${venueId}`);
  }

  // Delete a venue by ID
  deleteVenue(venueId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.delete<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/delete/${venueId}`);
  }
}
