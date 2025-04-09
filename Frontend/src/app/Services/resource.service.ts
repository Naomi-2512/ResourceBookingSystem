import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../../interfaces/interfacess';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  API_URL: string = 'http://localhost:3000/api/resource';

  constructor(private http: HttpClient) { }

  createResource(resource: Resource): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create`, resource);
  }

  // Update a resource by ID
  updateResource(resourceId: string, resource: Partial<Resource>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update/${resourceId}`, resource);
  }

  // Fetch all resources
  fetchAllResources(): Observable<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Fetch a single resource by ID
  fetchOneResource(resourceId: string): Observable<{ success: boolean, error?: string, message?: string, resource?: Resource | unknown }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, resource?: Resource | unknown }>(`${this.API_URL}/fetchOne/${resourceId}`);
  }

  // Fetch resources by category ID
  fetchResourceByCategoryId(categoryId: string): Observable<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }>(`${this.API_URL}/fetchByCategory/${categoryId}`);
  }

  // Get available resources
  getAvailableResources(): Observable<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, resources?: Resource[] | unknown[] }>(`${this.API_URL}/getAvailable`);
  }

  // Delete a resource by ID
  deleteResource(resourceId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.delete<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/delete/${resourceId}`);
  }
}
