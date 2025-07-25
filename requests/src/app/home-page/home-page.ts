import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
 
 
  router: Router = inject(Router);
}
