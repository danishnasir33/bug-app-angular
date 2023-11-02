import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string = '';
  userType: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) 
    {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, this.mobileNumberValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.userType = params['userType'];
    });
  }

  mobileNumberValidator(control: FormControl) {
    const phoneNumber = control.value;
    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);
    return isValidPhoneNumber ? null : { invalidMobile: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {

      const formData = this.signupForm.value;
      formData.user_type = this.userType;

      console.log(formData)

      this.authService.signUp(formData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('response', response);
            this.userService.setUser(response.data);
            // Redirect to the projects page
            this.router.navigate(['/projects']);
            this.openSnackBar('Sign Up successfully', 'Close');
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
