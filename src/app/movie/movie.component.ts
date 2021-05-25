import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../_services/movie.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  faStar = faStar;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  toWatch = false;
  watched = false;

  selected = 0;
  hovered = 0;

  isLoggedIn!: boolean;
  userId!: string;
  movieId!: string;

  movie: any;
  posterImage: any;
  backgroundImage: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.movieId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.id;
    }
    else {
      this.router.navigate(['../../account/login'], { relativeTo: this.route })
    }

    this.movieService.getMovie(this.movieId).subscribe(
      response => {
        this.movie = response;
        let posterBytes = 'data:image/jpeg;base64,' + this.movie.posterImage;
        this.posterImage = this.sanitizer.bypassSecurityTrustUrl(posterBytes);
        let backgroundBytes = 'data:image/jpeg;base64,' + this.movie.backgroundImage;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundBytes);
      },
    )

    this.movieService.getMovieWatchInfo(this.userId, this.movieId).subscribe(
      response => {
        this.toWatch = response.inToWatch;
        this.watched = response.inWatched;
        this.selected = response.movieRating;
      }
    )
  }

  addWatched() {
    this.movieService.addMovieWatched(this.userId, this.movieId, this.selected).subscribe(
      response => {
        this.watched = true;
        this.toWatch = true;
      },
      error => {

      }
    )
  }

  addToWatch() {
    this.movieService.addMovieToWatch(this.userId, this.movieId).subscribe(
      response => {
        this.toWatch = true;
      },
      error => {
        
      }
    )
  }
}
