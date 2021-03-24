import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const profileModule = () => import('src/app/account/profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
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