import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-usermovies',
  templateUrl: './usermovies.component.html',
  styleUrls: ['./usermovies.component.css']
})
export class UsermoviesComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  loaded: boolean = false;

  toWatchDisplay = true;
  watchedDisplay = false;
  favoriteDisplay = false;

  isLoggedIn!: boolean;
  userId!: string;
  findUserId!: string;
  username!: string;

  moviesToWatch!: any;
  moviesWatched!: any;
  moviesFavorite!: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.username = this.route.snapshot.params['username'];
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.userId;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.userService.findUser(this.username).subscribe(
      response => {
        this.findUserId = response;

        this.userService.getMoviesToWatch(this.userId).subscribe(
          response => {
            this.moviesToWatch = response;
          }
        )

        this.userService.getMoviesWatched(this.userId).subscribe(
          response => {
            this.moviesWatched = response;
          }
        )

        this.userService.getMoviesFavorite(this.userId).subscribe(
          response => {
            this.moviesFavorite = response;
          }
        )
      }
    )
    
    this.loaded = true;
  }

  displayMoviePoster(posterImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + posterImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  createImagePath(path: any) {
    return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + path;
  }

  displayToWatch() {
    this.toWatchDisplay = true;
    this.watchedDisplay = false;
    this.favoriteDisplay = false;
  }

  displayWatched() {
    this.toWatchDisplay = false;
    this.watchedDisplay = true;
    this.favoriteDisplay = false;
  }

  displayFavorite() {
    this.toWatchDisplay = false;
    this.watchedDisplay = false;
    this.favoriteDisplay = true;
  }

}
