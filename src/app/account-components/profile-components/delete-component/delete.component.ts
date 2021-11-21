import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  deleteForm!: FormGroup;
  hide = true;

  isLoggedIn!: boolean;
  userId!: string;
  username!: string;

  invalidPassword = 'Empty Password!';
  errorInfo = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.deleteForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.userId;
      this.username = user.username;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

  get f() { return this.deleteForm.controls; }

  delete() {
    if (this.deleteForm.invalid) return;
    this.invalidPassword = 'Empty Password!';

    this.userService.auth(this.username, this.deleteForm.controls['password'].value).subscribe(
      response => {
        this.userService.delete(this.userId).subscribe(
          response => {
            this.logout();
            this.router.navigate(['**'], { relativeTo: this.route })
          },
          error => {
            if (error.error.message == 'Podany użytkownik nie został odnaleziony!') {
              this.invalidPassword = "Problem";
              this.deleteForm.controls['password'].setErrors({ 'incorrect': true });
            }
          }
        )
      },
      error => {
        this.invalidPassword = 'Wrong Password!';
        this.deleteForm.controls['password'].setErrors({ 'incorrect': true });
      }
    )
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getFormPassword() { return this.deleteForm.controls['password'].invalid; }
}
