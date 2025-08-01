import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsInterface } from './requests-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  http: HttpClient = inject(HttpClient);
  apiUrl: string = "http://localhost:3000/requests";

  constructor() { };

  getRequestById(childId: number): Observable<RequestsInterface> {
    return this.http.get<RequestsInterface>(`${this.apiUrl}requests/${childId}`);
  }

  getAllRequests(): Observable<RequestsInterface[]> {
    return this.http.get<RequestsInterface[]>(`${this.apiUrl}requests/`);
  }
  addRequest(childId: number, data: RequestsInterface) {
    return this.http.post<RequestsInterface>(`${this.apiUrl}requests/`, data);
  }
  deleteRequest(childId: number){
    return this.http.delete(`${this.apiUrl}delete/${childId}`);
  }
  updateRequest(childId: number, data: RequestsInterface) {
    return this.http.put<RequestsInterface>(`${this.apiUrl}update/${childId}`, data)

  }
}
