import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "Culture Cup";
  isLoggedIn!: boolean;
  id!: string;
  username!: string;
  profileImage: any;
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;
      this.username = user.username;
      this.getImage();
    }
  }

  getImage() {
    this.userService.getImage(this.id).subscribe(
      response => {
        let bytes = 'data:image/jpeg;base64,' + response.profileImage;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(bytes);
      },
      error => {
        this.profileImage = undefined;
      }
    )
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
