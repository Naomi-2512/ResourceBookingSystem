import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/interfacess';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URL: string = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create`, category);
  }

  // Fetch all categories
  fetchCategories(): Observable<{ success: boolean, error?: string, message?: string, categories?: Category[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, categories?: Category[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Fetch a single category by ID
  fetchCategory(categoryId: string): Observable<{ success: boolean, error?: string, message?: string, category?: Category | unknown }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, category?: Category | unknown }>(`${this.API_URL}/fetchOne/${categoryId}`);
  }

  // Delete a category by ID
  deleteCategory(categoryId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.delete<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/delete/${categoryId}`);
  }
}
