import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GameComponent } from './game-component/game.component';
import { AllGamesComponent } from './games-components/all-games/all-games.component';
import { TopGamesComponent } from './games-components/top-games/top-games.component';
import { UpcomingGamesComponent } from './games-components/upcoming-games/upcoming-games.component';

import { HomeComponent } from './home-component/home.component';
import { MovieComponent } from './movie-component/movie.component';
import { AllMoviesComponent } from './movies-components/all-movies/all-movies.component';
import { PopularMoviesComponent } from './movies-components/popular-movies/popular-movies.component';
import { TopMoviesComponent } from './movies-components/top-movies/top-movies.component';
import { UpcomingMoviesComponent } from './movies-components/upcoming-movies/upcoming-movies.component';

const accountModule = () => import('src/app/account-components/account.module').then(x => x.AccountModule);
const libraryModule = () => import('src/app/library-components/library.module').then(x => x.LibraryModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: AllMoviesComponent },
  { path: 'popularmovies', component: PopularMoviesComponent },
  { path: 'topmovies', component: TopMoviesComponent },
  { path: 'upcomingmovies', component: UpcomingMoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'games', component: AllGamesComponent },
  { path: 'topgames', component: TopGamesComponent },
  { path: 'upcominggames', component: UpcomingGamesComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'library', loadChildren: libraryModule },
  
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TranslateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
