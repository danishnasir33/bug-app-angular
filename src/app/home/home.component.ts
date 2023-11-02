import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showManagerIcon: boolean = false;
  showDeveloperIcon : boolean = false;
  showQaIcon : boolean = false;

  constructor(private router: Router) {}

  goToSignup(userType: string) {
    this.router.navigate(['/signup'], { queryParams: { userType } });
  }

  // toggleIcon(value: boolean) {
  //   this.showIcon = value;
  // }
}
