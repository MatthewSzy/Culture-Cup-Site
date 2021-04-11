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

      let imageName = user.imageName;
      if(imageName != "") this.getImage();
    }
  }

  getImage() {
    this.userService.getImage(this.id).subscribe(
      response => {
        let object = 'data:image/jpeg;base64,' + response.imageBytes;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(object);
      },
      error => {
        this.profileImage = null;
      }
    )
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
