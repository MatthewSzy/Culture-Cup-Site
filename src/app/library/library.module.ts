import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { LayoutComponent } from './layout.component';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibraryRoutingModule } from './library-routing.module';
import { SelectionComponent } from './selection/selection.component';
import { YourmoviesComponent } from './yourmovies/yourmovies.component';
import { YourgamesComponent } from './yourgames/yourgames.component';

const modules = [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
]

@NgModule({
    declarations: [
        LayoutComponent,
        SelectionComponent,
        YourmoviesComponent,
        YourgamesComponent,
    ],
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        LibraryRoutingModule,
        FontAwesomeModule
    ],
    exports: [
        [...modules],
    ],
    providers: [authInterceptorProviders]
})
export class LibraryModule { }