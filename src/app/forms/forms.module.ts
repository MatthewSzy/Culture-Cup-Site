import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsRoutingModule
    ],
    declarations: [
        LayoutComponent
    ]
})
export class FormsModule { }