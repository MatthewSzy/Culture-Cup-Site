import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGamepad, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  faVideo = faVideo;
  faGamepad = faGamepad;
  faFacebook = faFacebook;
  faSpotify = faSpotify;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  isLoggedIn!: boolean;
  userId!: string;
  username!: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.username = this.route.snapshot.params['username'];
   }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.id;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

}
