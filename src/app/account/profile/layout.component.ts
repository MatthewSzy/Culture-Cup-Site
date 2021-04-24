import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

    faCircle = faCircle;

    isLoggedIn!: boolean;
    id!: string;
    username!: string;
    roles: string[] = [];
    profileImage: any;
    adminRole: boolean = false;

    constructor(
        private tokenStorageService: TokenStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private sanitizer: DomSanitizer
    ) {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
    }

    ngOnInit(): void {
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.id = user.id;
            this.username = user.username;
            this.roles = user.roles;
            if (this.roles[1] == "ROLE_ADMIN") {
                this.adminRole = true;
            }
            if (this.roles[0] == "ROLE_ADMIN") {
                this.adminRole = true;
            }
            
            if (user.imageId !== null) this.getImage();
        }
        else {
            this.router.navigate(['../login'], { relativeTo: this.route })
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
        this.router.navigate(['**'], { relativeTo: this.route });
        window.location.reload();
    }
}