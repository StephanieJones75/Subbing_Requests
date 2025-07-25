import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoginService } from '../login-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // admin = 1;
  router = inject(Router);
  loginService = inject(LoginService);
  isLoggedIn$: Observable<boolean>;
  
  constructor() {
    this.isLoggedIn$ = this.loginService.isLoggedIn$;
  }

  logOut() {
    this.loginService.logOut();
     this.router.navigate(['sign-in']);
  }
}
