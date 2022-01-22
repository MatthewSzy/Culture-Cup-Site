import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-usergames',
  templateUrl: './usergames.component.html',
  styleUrls: ['./usergames.component.css']
})
export class UsergamesComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  loaded: boolean = false;

  toPlayDisplay = true;
  playedDisplay = false;
  favoriteDisplay = false;

  isLoggedIn!: boolean;
  userId!: string;
  findUserId!: string;
  username!: string;

  gamesToPlay!: any;
  gamesPlayed!: any;
  gamesFavorite!: any;

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
      //this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.userService.findUser(this.username).subscribe(
      response => {
        this.findUserId = response;

        this.userService.getGamesToPlay(this.findUserId).subscribe(
          response => {
            this.gamesToPlay = response;
          }
        )

        this.userService.getGamesPlayed(this.findUserId).subscribe(
          response => {
            this.gamesPlayed = response;
          }
        )

        this.userService.getGamesFavorite(this.findUserId).subscribe(
          response => {
            this.gamesFavorite = response;
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
    return "https:" + path;
  }

  displayToPlay() {
    this.toPlayDisplay = true;
    this.playedDisplay = false;
    this.favoriteDisplay = false;
  }

  displayPlayed() {
    this.toPlayDisplay = false;
    this.playedDisplay = true;
    this.favoriteDisplay = false;
  }

  displayFavorite() {
    this.toPlayDisplay = false;
    this.playedDisplay = false;
    this.favoriteDisplay = true;
  }

}
