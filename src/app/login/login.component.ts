import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
    ) 
    {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value)

      const formData = this.loginForm.value;

      this.authService.signIn(formData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('response', response);
            this.userService.setUser(response.data);
            // Redirect to the projects page
            this.router.navigate(['/projects']);
            this.openSnackBar('Logged In successfully', 'Close');
          } else {
            this.errorMessage = 'Invalid credentials. Please try again.';
            this.openSnackBar(this.errorMessage, 'Close');
          }
        },
        (error) => {
          console.error('An error occurred:', error);
          this.errorMessage = error.error.message;
          this.openSnackBar(this.errorMessage, 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
