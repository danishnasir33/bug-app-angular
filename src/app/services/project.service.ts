import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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

  getProjectsForUser() {
    const headers = this.addTokenToHeaders();
    
    return this.http.get<any>(`${this.apiUrl}/user/projects`, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }

  createProject(data: {project_name: string, project_description: string }) {
    const headers = this.addTokenToHeaders();

    return this.http.post(`${this.apiUrl}/projects`, data, { headers }).pipe(
      tap((response: any) => {
        // Handle any post-response tasks here if needed
      })
    );
  }
  
}