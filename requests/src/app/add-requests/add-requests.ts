import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RequestService } from '../request-service';
import { RequestsInterface } from '../requests-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { get } from 'http';


@Component({
  selector: 'app-add-requests',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-requests.html',
  styleUrl: './add-requests.css'
})
export class AddRequests {
  @Input() request: RequestsInterface | null = null;
  addRequest!: FormGroup;
  router = inject(Router);
  route = inject(ActivatedRoute);
  childId = 0;

  requestForm = new FormGroup({
    child: new FormControl(''),
    team: new FormControl(''),
    date_requested: new FormControl(''),
    date_required1: new FormControl(''),
  });
  private requestService = inject(RequestService);

  ngOnInit() {
    this.childId = Number(this.route.snapshot.params['childid']);
    if (this.childId > 0) {
      this.requestService.getRequestById(this.childId).subscribe((data: any) => {
        const request = Array.isArray(data) ? data[0] : data;
        if (request) {
          this.request = request;
          this.requestForm.patchValue(request);
        }
      });
    }
  }

  onSubmit() {
    this.router.navigate(['/staff-signup']); //Go to Staff signup page after adding request
    // if (this.requestForm.valid) {
    //   // const formValue = this.requestForm.value;
    //   const formData = this.requestForm.value as unknown as RequestsInterface;
    //   if (this.childId) {
    //     this.requestService.updateRequest(this.childId, formData).subscribe(() => {
    //       this.router.navigate(['/staff-signup']); //Go to Staff signup page after update
    //     });

    //   } else {
    //     this.requestService.addRequest(this.childId, formData).subscribe(() => {
    //       this.router.navigate(['/staff-signup']); //Go to Staff signup page after adding request
    //     });
    //   }
    // }
    }

  onCancel() {
    this.requestForm.reset(); //Reset the form to start over but stay on add request page
    
  }
}
