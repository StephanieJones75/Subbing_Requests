import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable(
  { providedIn: 'root' }
)
export class LoginService {
  private platformId = inject(PLATFORM_ID);

  constructor() { }

  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();


  userLogin(data: {}) {
    return this.http.post<{ token?: string }>('http://localhost:3000/staff', data).pipe(
      tap((response) => {
        if (isPlatformBrowser(this.platformId)) {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        }
      })
    );
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.loggedIn.next(false);
  }
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = localStorage.getItem('token');
        // isTokenExpired returns true if the token is expired or does not exist.
        return !this.jwtHelper.isTokenExpired(token);
      } catch {
        return false;
      }
    }
    return false;
  }
}
