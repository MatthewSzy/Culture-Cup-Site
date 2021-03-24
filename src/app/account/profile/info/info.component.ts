import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  isLoggedIn!: boolean;
  username?: string;
  email?: string;
  creationDate?: Date;
  roles: string[] = [];

  constructor(
      private tokenStorageService: TokenStorageService,
      private route: ActivatedRoute,
      private router: Router
  ) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.email = user.email;
      this.creationDate = user.creationDate;
      this.roles = user.roles;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route})
    }
  }

}
