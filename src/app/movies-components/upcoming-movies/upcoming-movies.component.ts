import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MovieService } from 'src/app/_services/movie.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  isLoggedIn!: boolean;
  loaded: boolean = false;
  movies!: any;

  length = 2020;
  pageSize = 20;
  pageIndex = 1;
  pageEvent!: PageEvent;
  actualPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private tokenStorageService: TokenStorageService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) this.router.navigate(['../account/login'], { relativeTo: this.route });

    this.movieService.getUpcomingMovies("1").subscribe(
      response => {
        this.movies = response;
        this.loaded = true;
      }
    )
  }

  createImagePath(path: any) {
    return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + path;
  }

  handlePageEvent(event: PageEvent) {
    this.movieService.getUpcomingMovies(event.pageIndex.toString()).subscribe(
      response => {
        this.movies = response;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.actualPage = event.pageIndex;
      }
    )
  }
}
