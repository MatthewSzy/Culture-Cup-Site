import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { LayoutComponent } from './layout.component';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';

const modules = [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
]

@NgModule({
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    exports: [
        [...modules],
    ],
    providers: [authInterceptorProviders],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegistrationComponent,
    ]
})
export class AccountModule { }