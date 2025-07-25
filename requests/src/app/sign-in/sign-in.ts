import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login-service';


@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  standalone: true,
  providers: [LoginService],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  })
  loginService = inject(LoginService);
  route = inject(Router);
  loginError: string | null = null;

   signIn(){
    if(this.signInForm.valid){
      this.loginService.userLogin(this.signInForm.value).subscribe({
        next: () => {
          this.route.navigate(['/add-requests']);
              },
             });
    }
  }

  // submitSignIn(): void {
  //     this.loginError = null;
  //     if (this.signInForm.valid) {
  //       this.loginService.userLogin(this.signInForm.value).userLogin(this.signInForm.value).subscribe({
  //         next: () => this.route.navigate(['/add-requests']), // Navigate to the add-requests
  //         error: (error) => {
  //           this.loginError = 'Invalid username or password. Please try again.';
  //           console.error('Login failed', err);
  //         }
  //       });
  //     }
  //   }
    // ngOnInit(): void {
    //   this.signInForm = this.group({
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required]]
    //   });
    // }
  }
