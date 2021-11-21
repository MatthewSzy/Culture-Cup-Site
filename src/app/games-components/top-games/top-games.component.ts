import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { PageEvent } from '@angular/material/paginator';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'app-top-games',
  templateUrl: './top-games.component.html',
  styleUrls: ['./top-games.component.css']
})
export class TopGamesComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  isLoggedIn!: boolean;
  loaded: boolean = false;
  games!: any;

  length = 2020;
  pageSize = 20;
  pageIndex = 1;
  pageEvent!: PageEvent;
  actualPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private tokenStorageService: TokenStorageService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) this.router.navigate(['../account/login'], { relativeTo: this.route });

    this.gameService.getTopGames("1").subscribe(
      response => {
        this.games = response;
        this.loaded = true;
      }
    )
  }

  createImagePath(path: any) {
    return "https:" + path;
  }

  handlePageEvent(event: PageEvent) {
    this.gameService.getTopGames(event.pageIndex.toString()).subscribe(
      response => {
        this.games = response;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.actualPage = event.pageIndex;
      }
    )
  }

}
