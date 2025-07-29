import { Component } from '@angular/core';
import { ChildInterface } from '../child-interface';
import { NgForm, FormsModule } from '@angular/forms';
import { response } from 'express';
import { RequestService } from '../request-service';


@Component({
  selector: 'app-add-requests',
  imports: [FormsModule],
  templateUrl: './add-requests.html',
  styleUrl: './add-requests.css'
})
export class AddRequests {
  

  constructor(private requestService: RequestService) {
    
  }
  onSubmit(form: any) {
    
     // Collect form values as needed
    const request = {
      child: form.value.child,
      team: form.value.colour,
      date: form.value.requestdate1 // or whichever date you want
    };
    this.requestService.addRequest(request);
    form.reset();
  }
      // Save request to localStorage
// const requests = JSON.parse(localStorage.getItem('requests') || '[]');
// requests.push({ child: '', team: '', date: '' });
// localStorage.setItem('requests', JSON.stringify(requests));
//     // 1. Log the response to the console for debugging purposes.
//     console.log('Form submitted successfully!', form.value);

//     console.log('Request submitted successfully!', response);
//     // 2. After successful submission, reset the form to clear all fields.
//     form.resetForm();
//   }
}
