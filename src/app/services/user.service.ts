import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  private addTokenToHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.log('Token not present');
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  setUser(user: any) {
    this.user = {
      name: user.name,
      user_type: user.user_type
    };
  }

  getUser() {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }

  getUserData() {
    const headers = this.addTokenToHeaders();
    
    return this.http.get<any>(`http://localhost:5000/api/v1/users/me`, { headers }).pipe(
      tap((response: any) => {
        if (response && response.data) {
          console.log("user data: ", response )
          if (response.data.access_token) {
            localStorage.setItem(this.authService.tokenKey, response.data.access_token);
          }
        }
      })
    );
  }
  
}
