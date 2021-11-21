import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/_services/game.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

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

    this.gameService.getAllGames("1").subscribe(
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
    this.gameService.getAllGames(event.pageIndex.toString()).subscribe(
      response => {
        this.games = response;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.actualPage = event.pageIndex;
      }
    )
  }

}
