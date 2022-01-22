import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibraryRoutingModule } from './library-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LibraryComponent } from './library.component';
import { SelectionComponent } from './selection-component/selection.component';
import { YourmoviesComponent } from './yourmovies/yourmovies.component';
import { YourgamesComponent } from './yourgames/yourgames.component';
import { UserSelectionComponent } from './user-selection-component/user-selection.component';
import { UsermoviesComponent } from './usermovies/usermovies.component';
import { UsergamesComponent } from './usergames/usergames.component';

const modules = [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
]

@NgModule({
    declarations: [
        LibraryComponent,
        SelectionComponent,
        YourmoviesComponent,
        YourgamesComponent,
        UserSelectionComponent,
        UsermoviesComponent,
        UsergamesComponent,
        
    ],
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        LibraryRoutingModule,
        FontAwesomeModule,
        TranslateModule
    ],
    exports: [
        [...modules],
    ],
    providers: [authInterceptorProviders]
})
export class LibraryModule { }