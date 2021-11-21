import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login-component/login.component';
import { RegistrationComponent } from './registration-component/registration.component';

const profileModule = () => import('src/app/account-components/profile-components/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    {
        path: '', component: AccountComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'registration', component: RegistrationComponent },
            { path: 'profile', loadChildren: profileModule },
        ]
    },
    { path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }