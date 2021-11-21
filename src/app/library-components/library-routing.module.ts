import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import { SelectionComponent } from './selection-component/selection.component';
import { YourgamesComponent } from './yourgames/yourgames.component';
import { YourmoviesComponent } from './yourmovies/yourmovies.component';

const routes: Routes = [
    { 
        path: '', component: LibraryComponent,
        children: [
            { path: 'selection', component: SelectionComponent },
            { path: 'yourmovies', component: YourmoviesComponent },
            { path: 'yourgames', component: YourgamesComponent },
        ]
    }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }