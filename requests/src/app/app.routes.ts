import { Routes, CanActivate } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { AddRequests } from './add-requests/add-requests';
import { StaffSignup } from './staff-signup/staff-signup';
import { LogoutPage } from './logout-page/logout-page';
import { SignIn } from './sign-in/sign-in';
import { LoginService } from './login-service';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
   
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
        //     canActivate: [authGuard]
    },
    {
        path: 'logout',
        component: LogoutPage
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'sign-in'
    }
];
