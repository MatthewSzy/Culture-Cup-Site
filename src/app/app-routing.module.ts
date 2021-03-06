import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';

const accountModule = () => import('src/app/account/account.module').then(x => x.AccountModule);
const libraryModule = () => import('src/app/library/library.module').then(x => x.LibraryModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'library', loadChildren: libraryModule },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
