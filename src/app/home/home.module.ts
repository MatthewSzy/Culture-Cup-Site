import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }