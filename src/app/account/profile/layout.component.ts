import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
  })
export class LayoutComponent { 
    isLoggedIn!: boolean;
    username?: string;
    roles: string[] = [];
    adminRole: boolean = false;

    constructor(
        private tokenStorageService: TokenStorageService,
        private route: ActivatedRoute,
        private router: Router,

    ) {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
    }

    ngOnInit(): void {
        if(this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.username = user.username;
            this.roles = user.roles;
            if(this.roles[1] == "ADMIN") {
                this.adminRole = true;
            }
            if(this.roles[0] == "ADMIN") {
                this.adminRole = true;
            }
        }
        else {
            this.router.navigate(['../login'], { relativeTo: this.route})
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        this.router.navigate(['**'], { relativeTo: this.route});
        window.location.reload();
    }
}