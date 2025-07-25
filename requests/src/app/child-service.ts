import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildInterface } from './child-interface';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  
  http:HttpClient = inject(HttpClient);

  apiUrl:string = "http://localhost:3000/";

   getAllChild() : Observable<ChildInterface[]>{

    // const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':  this.token ? this.token : ''});
    // const options = {headers:headers};
    // return this.http.get('${this.apiUrl}child/', options);
    return this.http.get<ChildInterface[]>(`${this.apiUrl}child/`);
  }
}
