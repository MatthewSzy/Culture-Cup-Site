import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  isLoggedIn!: boolean;

  invalidUsername = 'Proszę podać nazwę użytkownika lub e-mail!';
  invalidPassword = 'Proszę podać hasło!';

  roles: string[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { 
    if(this.isLoggedIn) {
      this.router.navigate(['**'], { relativeTo: this.route})
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {

    if (this.form.invalid) { return; }
    
    this.clear();

    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
          data => {
            this.tokenStorageService.saveToken(data.accessToken);
            this.tokenStorageService.saveUser(data);
            this.roles = this.tokenStorageService.getUser().roles;

            this.router.navigate(['**'], { relativeTo: this.route})
              .then(() => {
                window.location.reload();
              });
          },
          error => {
            if(error.error.message == "Bad credentials") {
              this.invalidUsername = "Podana nazwa użytkownika lub hasło jest nie prawidłowe!";
              this.form.controls['username'].setErrors({'incorrect': true});
            }
          }
        );
  }

  clear() {
    this.invalidUsername = 'Proszę podać nazwę użytkownika lub e-mail!';
    this.invalidPassword = 'Proszę podać hasło!';
  }
}
