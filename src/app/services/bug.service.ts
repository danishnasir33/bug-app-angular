import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  private apiUrl = 'http://localhost:5000/api/v1';

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

  getBugsForUser(data: {project_id: number }) {
    const headers = this.addTokenToHeaders();
    
    return this.http.post<any>(`${this.apiUrl}/project/bugs`, data, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }

  getDevelopersForBug() {
    const headers = this.addTokenToHeaders();
    
    return this.http.get<any>('http://localhost:5000/api/v1/developers', { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }

  createBug(data: {title: string, description: string, bug_type: string, status: string, developer_user_id: number, project_id: number, deadline: Date, screen_shot: File }) {
    const headers = this.addTokenToHeaders();

    return this.http.post(`${this.apiUrl}/bugs`, data, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }

  deleteBug(bugId: number) {
    const headers = this.addTokenToHeaders();

    return this.http.delete(`${this.apiUrl}/bugs/${bugId}`, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }

  updateBug(bugId: number, data: any) {
    const headers = this.addTokenToHeaders();

    return this.http.patch(`${this.apiUrl}/bugs/${bugId}`, data, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }
}
