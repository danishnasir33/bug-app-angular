import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/v1/auth';
  public tokenKey = 'auth-token';

  constructor(private http: HttpClient) { }

  signIn(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.data && response.data.access_token) {
          localStorage.setItem(this.tokenKey, response.data.access_token);
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  signUp(data: {name: string, email: string, password: string, user_type:string }) {
    return this.http.post(`${this.apiUrl}/signup`, data).pipe(
      tap((response: any) => {
        if (response.data && response.data.access_token) {
          localStorage.setItem(this.tokenKey, response.data.access_token);
        }
      })
    );
  }

  signOut() {
    localStorage.removeItem(this.tokenKey);
  }
  
}
