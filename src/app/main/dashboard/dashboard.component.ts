import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any = {};

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUserData().subscribe(
      (response) => {
        this.currentUser = response.data;
        console.log(response)
      },
      (error) => {
        console.error('Error while fetching userData:', error);
      }
    );
  }

  logout() {
    this.authService.signOut();
    this.userService.clearUser();
    this.router.navigate(['/login']);
    this.openSnackBar('Logged out successfully', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
