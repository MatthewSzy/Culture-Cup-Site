import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/_services/game.service';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faVideo = faVideo;
  faGamepad = faGamepad;
  faStar = faStar;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  fourBestRatingMovies!: any;
  fourLastAddingMovies!: any;
  fourBestRatingGames!: any;
  fourLastAddingGames!: any;

  fourBestRatingMoviesPoster = new Array();
  fourLastAddingMoviesPoster = new Array();
  fourBestRatingGamesPoster = new Array();
  fourLastAddingGamesPoster = new Array();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private gameService: GameService
  ) {}

  ngOnInit(): void { 
    this.movieService.getFourBestRatingMovie().subscribe(
      response => {
        this.fourBestRatingMovies = response;
        this.fourBestRatingMovies.forEach((movie: any) => {
          let bytes = 'data:image/jpeg;base64,' + movie.posterImage;
          this.fourBestRatingMoviesPoster.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )

    this.gameService.getFourBestRatingGame().subscribe(
      response => {
        this.fourBestRatingGames = response;
        this.fourBestRatingGames.forEach((game: any) => {
          let bytes = 'data:image/jpeg;base64,' + game.posterImage;
          this.fourBestRatingGamesPoster.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )
    
    this.movieService.getFourLastAddingMovie().subscribe(
      response => {
        this.fourLastAddingMovies = response;
        this.fourLastAddingMovies.forEach((movie: any) => {
          let bytes = 'data:image/jpeg;base64,' + movie.posterImage;
          this.fourLastAddingMoviesPoster.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )

    this.gameService.getFourLastAddingGame().subscribe(
      response => {
        this.fourLastAddingGames = response;
        this.fourLastAddingGames.forEach((game: any) => {
          let bytes = 'data:image/jpeg;base64,' + game.posterImage;
          this.fourLastAddingGamesPoster.push(this.sanitizer.bypassSecurityTrustUrl(bytes));
        });
      }
    )
  }
}