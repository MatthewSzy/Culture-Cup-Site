import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
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

    this.adminService.getUsers().subscribe(
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
    this.adminService.setAdminRole(id).subscribe(
      response => {
        window.location.reload();
      },
    )
  }

  deleteAdmin(id: string) {
    this.adminService.deleteAdminRole(id).subscribe(
      response => {
        window.location.reload();
      },
    )
  }
}
