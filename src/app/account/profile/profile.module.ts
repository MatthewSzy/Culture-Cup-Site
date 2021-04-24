import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutComponent } from './layout.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { UserlistComponent } from './userlist/userlist.component';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { PhotoComponent } from './photo/photo.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddgameComponent } from './addgame/addgame.component';

const modules = [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
]

@NgModule({
    declarations: [
        LayoutComponent,
        InfoComponent,
        EditComponent,
        DeleteComponent,
        UserlistComponent,
        PhotoComponent,
        AddmovieComponent,
        AddgameComponent,
    ],
    imports: [
        [...modules],
        CommonModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        FontAwesomeModule
    ],
    exports: [
        [...modules],
    ],
    providers: [authInterceptorProviders]
})
export class ProfileModule { }