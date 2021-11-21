import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;

  isLoggedIn!: boolean;
  roles: string[] = [];

  invalidUsername = 'Empty Username!';
  invalidPassword = 'Empty Password!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private translateService: TranslateService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['**'], { relativeTo: this.route })
    }
  }

  login() {
      if (this.loginForm.invalid) return;
      this.invalidUsername = 'Empty Username!';
      this.invalidPassword = 'Empty Password!';

      this.userService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
        response => {
          this.tokenStorageService.saveToken(response.token);

          let userData: any = jwtDecode(response.token);
          this.tokenStorageService.saveUser(userData.UserData);

          this.router.navigate(['**'], { relativeTo: this.route }).then(
            () => {
              window.location.reload();
            });
        },
        error => {
          if (error.error.message == "Bad credentials") {
            this.invalidUsername = "Wrong Username!";
            this.loginForm.controls['username'].setErrors({ 'incorrect': true});
            this.invalidPassword = "Wrong Password!";
            this.loginForm.controls['password'].setErrors({ 'incorrect': true});
          }
        }
      );
  }

  getFormUsername() { return this.loginForm.controls['username'].invalid; }

  getFormPassword() { return this.loginForm.controls['password'].invalid; }
}
