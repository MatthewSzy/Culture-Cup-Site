import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../_services/game.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-movie',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  faStar = faStar;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  toPlay = false;
  played = false;

  selected = 0;
  hovered = 0;

  isLoggedIn!: boolean;
  userId!: string;
  gameId!: string;

  game: any;
  posterImage: any;
  backgroundImage: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private gameService: GameService,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.gameId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.id;
    }
    else {
      this.router.navigate(['../../account/login'], { relativeTo: this.route })
    }

    this.gameService.getGame(this.gameId).subscribe(
      response => {
        this.game = response;
        let posterBytes = 'data:image/jpeg;base64,' + this.game.posterImage;
        this.posterImage = this.sanitizer.bypassSecurityTrustUrl(posterBytes);
        let backgroundBytes = 'data:image/jpeg;base64,' + this.game.backgroundImage;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundBytes);
      },
    )
    
    this.gameService.getGamePlayInfo(this.userId, this.gameId).subscribe(
      response => {
        this.toPlay = response.inToPlay;
        this.played = response.inPlayed;
        this.selected = response.gameRating;
      }
    )
  }

  addPlayed() {
    this.gameService.addGamePlayed(this.userId, this.gameId, this.selected).subscribe(
      response => {
        this.played = true;
        this.toPlay = true;
      },
      error => {

      }
    )
  }

  addToPlay() {
    this.gameService.addGameToPlay(this.userId, this.gameId).subscribe(
      response => {
        this.toPlay = true;
      },
      error => {
        
      }
    )
  }
}
