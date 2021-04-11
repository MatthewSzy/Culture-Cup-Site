import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { LayoutComponent } from './layout.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { UserlistComponent } from './userlist/userlist.component';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { PhotoComponent } from './photo/photo.component';

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
        ProfileRoutingModule
    ],
    exports: [
        [...modules],
    ],
    providers: [authInterceptorProviders],
    declarations: [
        LayoutComponent,
        InfoComponent,
        EditComponent,
        DeleteComponent,
        UserlistComponent,
        PhotoComponent,
    ]
})
export class ProfileModule { }