import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { LayoutComponent } from './layout.component';
import { FormsRoutingModule } from './forms-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

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
        FormsRoutingModule
    ],
    exports: [
        [...modules],
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegistrationComponent
    ]
})
export class FormsModule { }