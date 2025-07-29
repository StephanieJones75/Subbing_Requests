import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StaffInterface } from './staff-interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private platformId = inject(PLATFORM_ID);
  private apiUrl: string = "http://localhost:3000/staff";
  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { };
 
  getAllStaff(): Observable<StaffInterface[]> {
    return this.http.get<StaffInterface[]>(`${this.apiUrl}staff/`);
  }

   userLogin(data: {}) {
    return this.http.post<{ token?: string }>('http://localhost:3000/signin', data).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        }
      })
    );
  }
}
