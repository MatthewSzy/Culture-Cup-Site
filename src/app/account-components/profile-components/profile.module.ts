import { NgModule } from '@angular/core';

import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { BnNgIdleService } from 'bn-ng-idle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo-component/photo.component';
import { DeleteComponent } from './delete-component/delete.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { EditComponent } from './edit-component/edit.component';
import { UserlistComponent } from './userlist-component/userlist.component'

const modules = [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
]

@NgModule({
    declarations: [
        ProfileComponent,
        PhotoComponent,
        DeleteComponent,
        EditComponent,
        UserlistComponent,
    ],
    imports: [
        [...modules],
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule,
    ],
    exports: [[...modules],],
    providers: [authInterceptorProviders, BnNgIdleService]
})
export class ProfileModule { }