import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    faCircle = faCircle;

    isLoggedIn!: boolean;
    userId!: string;
    username!: string;
    roles: string[] = [];
    profileImage: any;
    adminRole: boolean = false;

    constructor(
        private tokenStorageService: TokenStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private sanitizer: DomSanitizer,
    ) {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
    }

    ngOnInit(): void {
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.username = user.username;
            if (user.roles[1].authority == "ROLE_ADMIN") {
                this.adminRole = true;
            }
            if (user.roles[0].authority == "ROLE_ADMIN") {
                this.adminRole = true;
            }
            this.getImage(user.userId);
        }
        else {
            this.router.navigate(['../login'], { relativeTo: this.route })
        }
    }

    getImage(userId: string) {
        this.userService.getImage(userId).subscribe(
          response => {
            let bytes = 'data:image/jpeg;base64,' + response.profileImage;
            this.profileImage = this.sanitizer.bypassSecurityTrustUrl(bytes);
          },
          error => {
            this.profileImage = undefined;
          }
        )
      }
}