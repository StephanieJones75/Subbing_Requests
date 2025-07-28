import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffInterface } from '../staff-interface';
import { get } from 'http';
import { RequestService } from '../request-service';

@Component({
  selector: 'app-staff-signup',
  imports: [CommonModule],
  templateUrl: './staff-signup.html',
  styleUrl: './staff-signup.css'
})
export class StaffSignup implements OnInit {
  requests: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requests = this.requestService.getRequests();
  }
}
