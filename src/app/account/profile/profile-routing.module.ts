import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { LayoutComponent } from './layout.component';
import { PhotoComponent } from './photo/photo.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'info', component: InfoComponent },
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
