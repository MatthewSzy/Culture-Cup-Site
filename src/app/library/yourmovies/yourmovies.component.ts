import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { MovieService } from 'src/app/_services/movie.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-yourmovies',
  templateUrl: './yourmovies.component.html',
  styleUrls: ['./yourmovies.component.css']
})
export class YourmoviesComponent implements OnInit {

  faStar = faStar;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  toWatchDisplay = true;
  watchedDisplay = false;

  isLoggedIn!: boolean;
  id!: string;

  moviesToWatch!: any;
  moviesWatched!: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.movieService.getAllMovieToWatch(this.id).subscribe(
      response => {
        this.moviesToWatch = response;
      }
    )

    this.movieService.getAllMovieWatched(this.id).subscribe(
      response => {
        this.moviesWatched = response;
      }
    )
  }

  displayMoviePoster(posterImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + posterImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  displayToWatch() {
    this.toWatchDisplay = true;
    this.watchedDisplay = false;
  }

  displayWatched() {
    this.toWatchDisplay = false;
    this.watchedDisplay = true;
  }
}
