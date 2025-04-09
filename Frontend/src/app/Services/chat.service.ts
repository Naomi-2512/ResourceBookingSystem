import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../../interfaces/interfacess';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  API_URL: string = 'http://localhost:3000/api/chats';

  constructor(private http: HttpClient) { }
  createChat(chat: Chat): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.post<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/create`, chat);
  }

  // Update a chat by ID
  updateChat(chatId: string, chat: Partial<Chat>): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.put<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/update/${chatId}`, chat);
  }

  // Fetch all chats
  getAllChats(): Observable<{ success: boolean, error?: string, message?: string, chats?: Chat[] | unknown[] }> {
    return this.http.get<{ success: boolean, error?: string, message?: string, chats?: Chat[] | unknown[] }>(`${this.API_URL}/fetchAll`);
  }

  // Delete a chat by ID
  deleteChat(chatId: string): Observable<{ success: boolean, error?: string, message?: string }> {
    return this.http.delete<{ success: boolean, error?: string, message?: string }>(`${this.API_URL}/delete/${chatId}`);
  }
}
