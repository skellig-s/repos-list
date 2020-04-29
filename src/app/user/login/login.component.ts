import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.router.navigate(['/repos']);
    }
  }

  public onLogin(): void {
    this.authService.login().then( () => {
      this.router.navigate(['/repos']);
      }, () => {
        console.log('Login error');
      }
    );
  }

}
