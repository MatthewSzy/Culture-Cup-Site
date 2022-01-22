import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import { SelectionComponent } from './selection-component/selection.component';
import { UserSelectionComponent } from './user-selection-component/user-selection.component';
import { UsergamesComponent } from './usergames/usergames.component';
import { UsermoviesComponent } from './usermovies/usermovies.component';
import { YourgamesComponent } from './yourgames/yourgames.component';
import { YourmoviesComponent } from './yourmovies/yourmovies.component';

const routes: Routes = [
    { 
        path: '', component: LibraryComponent,
        children: [
            { path: 'selection', component: SelectionComponent },
            { path: 'user-selection/:username', component: UserSelectionComponent },
            { path: 'yourmovies', component: YourmoviesComponent },
            { path: 'usermovies/:username', component: UsermoviesComponent },
            { path: 'yourgames', component: YourgamesComponent },
            { path: 'usergames/:username', component: UsergamesComponent }
        ]
    }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }