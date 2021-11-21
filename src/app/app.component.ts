import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './_services/user.service';

import { faAngleDown, faEye, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from './_services/movie.service';
import { GameService } from './_services/game.service';

export interface Element {
  id: number;
  type: string;
  title: string;
  authorName: string;
  posterImage: Byte[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Culture-Cup';
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faStar = faStar;
  faEye = faEye;

  supportLanguages = ['pl', 'en'];
  actualLanguage!: any;

  isLoggedIn!: boolean;
  username!: string;
  profileImage: any;

  searchForm!: FormGroup;
  searchTab: boolean = false;

  searchMovies!: any;
  searchGames!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private movieService: MovieService,
    private gameService: GameService,
    private tokenStorageService: TokenStorageService,
    private translateService: TranslateService,
  ) {
    this.translateService.set
    this.translateService.use('pl');
    this.actualLanguage = sessionStorage.getItem('actualLanguage');
    if (this.actualLanguage) {
      translateService.use(this.actualLanguage);
      sessionStorage.setItem('actualLanguage', this.actualLanguage);
    }
    else {
      translateService.use('pl');
      sessionStorage.setItem('actualLanguage', this.actualLanguage);
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.bnIdle.startWatching(60000).subscribe(
      response => {
        if(response) { 
          window.sessionStorage.clear(); 
          this.router.navigate(['../account/login'], { relativeTo: this.route })
        }
    });
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.getImage(user.userId);
    }
  }

  onActivate(event: any) {
    window.scroll(0,0);
  }

  polishLanguage(languageType: string) {
    this.translateService.use(languageType)
    sessionStorage.setItem('actualLanguage', 'pl');
  }

  englishLanguage(languageType: string) {
    this.translateService.use(languageType)
    sessionStorage.setItem('actualLanguage', 'en');
  }

  getImage(userId: string) {
    this.userService.getImage(userId).subscribe(
      response => {
        let bytes = 'data:image/jpeg;base64,' + response.profileImage;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(bytes);
      },
      error => {
        this.profileImage = undefined;
      }
    )
  }

  openSearchTab() {
    if (this.searchTab) this.searchTab = false;
    else this.searchTab = true;
  }

  search() {
    if (this.searchForm.invalid) return;

    this.movieService.searchMovies(this.searchForm.controls['query'].value).subscribe(
      response => {
        this.searchMovies = response;
      }
    )

    this.gameService.searchGames(this.searchForm.controls['query'].value).subscribe(
      response => {
        this.searchGames = response;
      }
    )
  }

  createGameImagePath(path: any) {
    return "https:" + path;
  }

  createMovieImagePath(path: any) {
    return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + path;
  }

  routeToMovie(id: number) {
    this.searchTab = false;
    this.router.navigate([`movie/${id}`], { relativeTo: this.route })
      .then(() => {
        window.location.reload();
    });
  }

  routeToGame(id: number) {
    this.searchTab = false;
    this.router.navigate([`game/${id}`], { relativeTo: this.route })
      .then(() => {
        window.location.reload();
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
