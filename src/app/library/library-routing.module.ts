import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SelectionComponent } from './selection/selection.component';
import { YourgamesComponent } from './yourgames/yourgames.component';
import { YourmoviesComponent } from './yourmovies/yourmovies.component';

const routes: Routes = [
    { 
        path: '', component: LayoutComponent,
        children: [
            { path: 'selection', component: SelectionComponent },
            { path: 'yourMovies', component: YourmoviesComponent },
            { path: 'yourGames', component: YourgamesComponent },
        ]
    }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }