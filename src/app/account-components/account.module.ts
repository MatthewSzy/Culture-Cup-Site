import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { BnNgIdleService } from 'bn-ng-idle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips'

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login-component/login.component';
import { RegistrationComponent } from './registration-component/registration.component';

const modules = [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
]

@NgModule({
    declarations: [
        AccountComponent,
        LoginComponent,
        RegistrationComponent,
    ],
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FontAwesomeModule,
        TranslateModule
    ],
    exports: [[...modules],],
    providers: [authInterceptorProviders, BnNgIdleService]
})
export class AccountModule { }