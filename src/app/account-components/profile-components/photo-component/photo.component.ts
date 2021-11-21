import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  selectedFile!: File;
  image: any;
  isLoggedIn!: boolean;
  userId!: string;
  roles: string[] = [];

  invalidPrint = false;
  invalidUpload = 'Błąd podczas wysyłania zdjęcia';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.userId;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    }

    this.invalidUpload = 'Błąd podczas wysyłania zdjęcia';
    this.invalidPrint = false;
  }

  uploadPhoto() {
    if (this.selectedFile == undefined) {
      this.invalidUpload = "Proszę wybrać zdjęcie!";
      this.invalidPrint = true;
      return;
    }

    this.invalidPrint = false;

    this.userService.uploadImage(this.userId, this.selectedFile).subscribe(
      response => {
        const user = this.tokenStorageService.getUser();
        user.imageId = response.message;

        this.tokenStorageService.saveUser(user);
        window.location.reload();
      },
      error => {
        this.invalidUpload = error.error.message;
        this.invalidPrint = true;
      }
    )
  }
}
