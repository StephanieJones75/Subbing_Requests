import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests: any[] = [];

  addRequest(request: any) {
    this.requests.push(request);
  }

  getRequests() {
    return this.requests;
  }
}
