import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator'

import localeEn from '@angular/common/locales/en';
import localePl from '@angular/common/locales/pl';

import { HomeComponent } from './home-component/home.component';
import { AllMoviesComponent } from './movies-components/all-movies/all-movies.component';
import { TopMoviesComponent } from './movies-components/top-movies/top-movies.component';
import { PopularMoviesComponent } from './movies-components/popular-movies/popular-movies.component';
import { UpcomingMoviesComponent } from './movies-components/upcoming-movies/upcoming-movies.component';
import { MovieComponent } from './movie-component/movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TopGamesComponent } from './games-components/top-games/top-games.component';
import { UpcomingGamesComponent } from './games-components/upcoming-games/upcoming-games.component';
import { AllGamesComponent } from './games-components/all-games/all-games.component';
import { GameComponent } from './game-component/game.component';

registerLocaleData(localePl, 'pl');
registerLocaleData(localeEn, 'en');

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatInputModule,
  MatChipsModule,
  MatPaginatorModule,
  ScrollingModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllMoviesComponent,
    TopMoviesComponent,
    PopularMoviesComponent,
    UpcomingMoviesComponent,
    MovieComponent,
    LocalizedDatePipe,
    TopGamesComponent,
    UpcomingGamesComponent,
    AllGamesComponent,
    GameComponent,
  ],
  imports: [
    [...modules],
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => { return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')},
        deps: [HttpClient]
      }
    }),
  ],
  exports: [...modules],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
