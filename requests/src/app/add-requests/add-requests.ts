import { Component } from '@angular/core';
import { ChildInterface } from '../child-interface';
import { NgForm, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-requests',
  imports: [FormsModule],
  templateUrl: './add-requests.html',
  styleUrl: './add-requests.css'
})
export class AddRequests {
  getChild: any;

  constructor() {
    this.getChild()
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Optionally, handle invalid form state
      return;
    }

    // 1. Here you would typically gather the form data and send it to a service.
    // const requestData = form.value;
    // this.requestService.submitRequest(requestData).subscribe(response => {
    //   console.log('Request submitted successfully!', response);
    //   form.resetForm(); // Reset form on success
    // });

    console.log('Form Submitted with values:', form.value);
    // 2. After successful submission, reset the form to clear all fields.
    form.resetForm();
  }
}
