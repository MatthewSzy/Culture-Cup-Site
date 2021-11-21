import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStar, faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CreditsService } from '../_services/credits.service';
import { GameService } from '../_services/game.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  commentForm!: FormGroup;
  loaded_game: boolean = false;

  toPlay = false;
  played = false;
  favorite = false;

  isLoggedIn!: boolean;
  userId!: string;
  username!: string;
  profileImage!: Byte[];
  gameId!: string;

  game: any;
  posterImage: any;
  backgroundImage: any;
  characters: any;
  comments: any;

  keys: any;
  values: any;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private creditsService: CreditsService,
    private gameService: GameService,
    private userService: UserService,
    public translateService: TranslateService
  ) { 
    this.translateService.set
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.gameId = this.route.snapshot.params['id'];
    this.commentForm! = this.formBuilder.group({
      commentInfo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.userId;

      this.gameService.getGame(this.gameId).subscribe(
        response => {
          this.game = response;
          console.log(response); 
          console.log(response.expansions);
          this.keys = Object.keys(response.releaseDates);
          this.posterImage = this.createImagePath(response.posterImageURL);
          this.backgroundImage = this.createImagePath(response.backdropImageURL);
          this.loaded_game = true;
        }
      );

      this.userService.getGamePlayInfo(this.userId, this.gameId).subscribe(
        response => {
          this.toPlay = response[0];
          this.played = response[1];
          this.favorite = response[2];
        }
      )
    }
  }

  addToPlay() {
    this.userService.addGameToPlay(this.userId, this.gameId).subscribe(
      response => {
        this.toPlay = true;
      },
      error => {
        
      }
    )
  }

  addPlayed() {
    this.userService.addGamePlayed(this.userId, this.gameId, 0.0).subscribe(
      response => {
        this.played = true;
        this.toPlay = true;
      },
      error => {

      }
    )
  }

  addToFavorite() {
    this.userService.addGameToFavorite(this.userId, this.gameId, 0.0).subscribe(
      response => {
        this.played = true;
        this.toPlay = true;
        this.favorite = true;
      },
      error => {

      }
    )
  }

  addComment() {
    /*
    this.movieService.addComment(this.movieId, this.userId, this.username, this.commentForm.controls.commentInfo.value).subscribe(
      response => {
        this.movieService.getAllComments(this.movieId).subscribe(
          response => {
            this.comments = response;
            this.commentForm.reset();
            this.commentForm.controls.commentInfo.setErrors(null);
          },
          error => {
            this.comments = null;
          }
        )
      },
      error => {

      }
    )
    */
  }

  checkComment(username: string) {
    /*
    if (username == this.username) return true;
    else return false;
    */
  }

  addLike(id: string) {
    /*
    this.movieService.addLike(id, this.userId).subscribe(
      response => {
        this.movieService.getAllComments(this.movieId).subscribe(
          response => {
            this.comments = response;
          },
          error => {
            this.comments = null;
          }
        )
      },
      error => {

      }
    )
    */
  }

  addUnlike(id: string) {
    /*
    this.movieService.addUnlike(id, this.userId).subscribe(
      response => {
        this.movieService.getAllComments(this.movieId).subscribe(
          response => {
            this.comments = response;
          },
          error => {
            this.comments = null;
          }
        )
      },
      error => {

      }
    )
    */
  }

  deleteComment(id: string){
    /*
    this.movieService.deleteComment(this.movieId, id).subscribe(
      response => {
        this.movieService.getAllComments(this.movieId).subscribe(
          response => {
            this.comments = response;
          },
          error => {
            this.comments = null;
          }
        )
      }
    )
    */
  }

  displayDate(date: any) {
    let newDate = date.toString();
    return date.slice(0, 10);
  }

  displayAllPlatforms(platforms: any) {
    let platform = platforms.toString();
    return platform.split(",").join("\n");
  }

  createImagePath(path: any) {
    return "https:" + path;
  }

  clearTextArea() {
    this.commentForm.controls['commentInfo'].setValue('');
    this.commentForm.controls['commentInfo'].setErrors(null);
  }

  convertImage(profileImage: any) {
    let bytes = 'data:image/jpeg;base64,' + profileImage;
    return this.sanitizer.bypassSecurityTrustUrl(bytes);
  }

  goToHomePage(path: string) {
    window.open(path, "_blank");
  }

  getCommentFormInvalid() {
    return this.commentForm.controls['commentInfo'].invalid;
  }
}
