import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffInterface } from './staff-interface';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  
   http:HttpClient = inject(HttpClient);

  apiUrl:string = "http://localhost:3000/";

   getAllStaff() : Observable<StaffInterface[]>{

    // const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':  this.token ? this.token : ''});
    // const options = {headers:headers};
    // return this.http.get('${this.apiUrl}staff/', options);
    return this.http.get<StaffInterface[]>(`${this.apiUrl}staff/`);
  }
}
