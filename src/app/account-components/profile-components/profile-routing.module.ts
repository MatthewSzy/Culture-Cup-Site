import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete-component/delete.component';
import { EditComponent } from './edit-component/edit.component';
import { PhotoComponent } from './photo-component/photo.component';
import { ProfileComponent } from './profile.component';
import { UserlistComponent } from './userlist-component/userlist.component';

const routes: Routes = [
    {
        path: '', component: ProfileComponent,
        children: [
            { path: 'edit', component: EditComponent },
            { path: 'photo', component: PhotoComponent },
            { path: 'delete', component: DeleteComponent },
            { path: 'userlist', component: UserlistComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }