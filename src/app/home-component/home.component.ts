import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faVideo, faGamepad, faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../_services/movie.service';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faVideo = faVideo;
  faGamepad = faGamepad;
  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  fourBestRatingMovies!: any;
  fourPopularMovies!: any;
  fourBestRatingGames!: any;
  fourPopularGames!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private gameService: GameService,
    private translateService: TranslateService,
  ) { 
    translateService.setDefaultLang('pl');
  }

  ngOnInit(): void {
    this.movieService.getHomeTop().subscribe(
      response => {
        this.fourBestRatingMovies = response;
      }
    )

    this.movieService.getHomePopular().subscribe(
      response => {
        this.fourPopularMovies = response;
      }
    )

    this.gameService.getHomeTop().subscribe(
      response => {
        this.fourBestRatingGames = response;
      }
    )

    this.gameService.getHomePopular().subscribe(
      response => {
        this.fourPopularGames = response;
      }
    )
  }

  createImagePathMovie(path: any) {
    return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + path;
  }

  createImagePathGame(path: any) {
    return "https:" + path;
  }

}
