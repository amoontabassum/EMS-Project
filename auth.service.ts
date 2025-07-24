import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000/users';
  private loggedInUsername: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}?username=${username}&password=${password}`);
  }

  setLoggedInUsername(username: string): void {
    this.loggedInUsername = username;
    localStorage.setItem('loggedInUsername', username);
  }

  getLoggedInUsername(): string {
    if (!this.loggedInUsername) {
      this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
    }
    return this.loggedInUsername;
  }

  logout(): void {
    this.loggedInUsername = '';
    localStorage.removeItem('loggedInUsername');
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }
}
