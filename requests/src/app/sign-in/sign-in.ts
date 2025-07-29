import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login-service';
import { StaffService } from '../staff-service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  standalone: true,
  providers: [StaffService],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn implements OnInit {
  signInForm!: FormGroup; // <-- Use definite assignment
  staffService = inject(StaffService);
  route = inject(Router);
  loginError: string | null = null;
  fb = inject(FormBuilder); // <-- Inject FormBuilder

  signIn() {
    if (this.signInForm.valid) {
      this.staffService.userLogin(this.signInForm.value).subscribe({
        next: () => {
          this.route.navigate(['/add-requests']);
        },
        error: (error) => {
          this.loginError = 'Invalid username or password. Please try again.';
          console.error('Login failed', error);
        }
      });
    }
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
