import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer
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

    this.userService.login(this.f.username.value, this.f.password.value).subscribe(
          response => {
            this.tokenStorageService.saveToken(response.token);
            this.tokenStorageService.saveUser(response);

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
