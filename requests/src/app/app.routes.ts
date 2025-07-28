import { Routes, CanActivate } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { AddRequests } from './add-requests/add-requests';
import { StaffSignup } from './staff-signup/staff-signup';
import { LogoutPage } from './logout-page/logout-page';
import { SignIn } from './sign-in/sign-in';
import { LoginService } from './login-service';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'sign-in',
        component: SignIn,
    },
    {
        path: 'add-requests',
        component: AddRequests,
        // canActivate: [LoginService]
        // data: { roles: ['admin'] }
    },
    {
        path: 'staff-signup',
        component: StaffSignup,
        // canActivate: [LoginService]
    },
    {
        path: 'logout',
        component: LogoutPage
    },
    {
        path: 'protected',
        component: AddRequests,
        canActivate: [LoginService] // Ensure user is authenticated
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
