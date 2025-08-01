import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StaffInterface } from '../staff-interface';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request-service';
import { RequestsInterface } from '../requests-interface';
import { StaffService } from '../staff-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staff-signup',
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-signup.html',
  styleUrl: './staff-signup.css'
})
export class StaffSignup {
  requestService: RequestService = inject(RequestService);
  staffService: StaffService = inject(StaffService);
  staff: StaffInterface[] = [];
  requests: RequestsInterface[] = [];
  child$!: Observable<RequestsInterface[]>;
  apiUrl = 'http://localhost:3000/';
  http: HttpClient = inject(HttpClient);
  requestForm: any;
  private router: Router = inject(Router);

constructor() {
  this.getAllRequests();
  this.getAllStaff();
}
getAllRequests() {
    this.requestService.getAllRequests().subscribe((requests: RequestsInterface[]) => {
      return this.http.get<RequestsInterface[]>(`${this.apiUrl}requests/`);
    });
  }
  getAllStaff() {
    this.staffService.getAllStaff().subscribe((staff: StaffInterface[]) => {
      return this.http.get<StaffInterface[]>(`${this.apiUrl}staff/`);
    });
  }
 
 
onSubmit() {
  this.router.navigate(['/logout']); // Navigate to logout page after signing up
}
}

