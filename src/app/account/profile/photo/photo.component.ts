import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  selectedFile!: File;
  image: any;
  isLoggedIn!: boolean;
  id!: string;
  roles: string[] = [];

  invalidPrint = false;
  invalidUpload = 'Błąd podczas wysyłania zdjęcia';

  constructor(
      private tokenStorageService: TokenStorageService,
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router,
      private sanitizer: DomSanitizer
  ) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route})
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    }
  }

  uploadPhoto() {
    this.invalidPrint = false;

    this.userService.upload(this.id, this.selectedFile).subscribe(
      response => {
        const user = this.tokenStorageService.getUser();
        user.imageName = response.message;

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
