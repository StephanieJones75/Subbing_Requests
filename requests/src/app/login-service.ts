import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable(
  { providedIn: 'root'}
)
export class LoginService {
  
  constructor() { }

  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  private isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}
 isAuthenticated(): boolean {
   if (!this.isBrowser()) return false;
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  userLogin(data: {}) {
    return this.http.post<{ token?: string }>('http://localhost:3000/staff', data).pipe(
      tap(response => {
        if (response.token && this.isBrowser()) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }
 
  logOut(): void {
    if (this.isBrowser()) {
    localStorage.removeItem('token');
  }
  this.loggedIn.next(false);
}
}
