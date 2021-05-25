import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { GameService } from 'src/app/_services/game.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-yourgames',
  templateUrl: './yourgames.component.html',
  styleUrls: ['./yourgames.component.css']
})
export class YourgamesComponent implements OnInit {

  faStar = faStar;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  toPlayDisplay = true;
  playedDisplay = false;

  isLoggedIn!: boolean;
  id!: string;

  gamesToPlay!: any;
  gamesPlayed!: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
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

    this.gameService.getAllGameToPlay(this.id).subscribe(
      response => {
        this.gamesToPlay = response;
      }
    )

    this.gameService.getAllGamePlayed(this.id).subscribe(
      response => {
        this.gamesPlayed = response;
      }
    )
  }

  displayGamePoster(posterImage: any): any {
    let bytes = 'data:image/jpeg;base64,' + posterImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  displayToPlay() {
    this.toPlayDisplay = true;
    this.playedDisplay = false;
  }

  displayPlayed() {
    this.toPlayDisplay = false;
    this.playedDisplay = true;
  }
}
