import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  isLoggedIn!: boolean;
  username!: string;
  roles: string[] = [];
  users: any;
  errorPrint: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles = user.roles;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }

    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        if (error.error.message == 'Nie uda się pobrać listy użytkowników, lista jest pusta!') {
          this.errorPrint = true;
        }
      }
    )
  }

  addAdmin(id: string) {
    this.userService.setAdminRole(id).subscribe(
      response => {
        window.location.reload();
      },
    )
  }

  deleteAdmin(id: string) {
    this.userService.deleteAdminRole(id).subscribe(
      response => {
        window.location.reload();
      },
    )
  }
}
