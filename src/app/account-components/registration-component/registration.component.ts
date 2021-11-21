import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  hide = true;

  isLoggedIn!: boolean;
  roles = ["user"];

  invalidUsername = 'Empty Username!';
  invalidEmail = 'Empty Email!';
  invalidPassword = 'Empty Password!';
  invalidRepeatPassword = 'Empty RepeatPassword!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private translateService: TranslateService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      this.router.navigate(['**'], { relativeTo: this.route})
    }
  }

  registration() {
      if (this.registrationForm.invalid) return;
      this.invalidUsername = 'Empty Username!';
      this.invalidEmail = 'Empty Email!';
      this.invalidPassword = 'Empty Password!';
      this.invalidRepeatPassword = 'Empty RepeatPassword!';

      if (this.registrationForm.controls['password'].value !== this.registrationForm.controls['repeatPassword'].value) {
        this.invalidRepeatPassword = "Wrong RepeatPassword!";
        this.registrationForm.controls['repeatPassword'].setErrors({'incorrect': true});
        return;
      }

      this.userService.registration(this.registrationForm.controls['username'].value, this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value, this.roles).subscribe(
        response => {
          this.router.navigate(['../login'], { relativeTo: this.route });
          setTimeout(() => {
            window.alert('Udało sie utworzyć nowe Konto!');
          }, 500);
        },
        error => {
          if(error.error.message == 'Użytkownik o podanej nazwie już istnieje!') {
            this.invalidUsername = "Exist Username!";
            this.registrationForm.controls['username'].setErrors({'incorrect': true});
          }
          else if(error.error.message == 'Podana nazwa użytkownika jest nie prawidłowy!') {
            this.invalidUsername = "Wrong Username!";
            this.registrationForm.controls['username'].setErrors({'incorrect': true});
          }
          else if(error.error.message == 'Użytkownik o podanym e-mailu już istnieje!') {
            this.invalidEmail = "Exist Email!";
            this.registrationForm.controls['email'].setErrors({'incorrect': true});
          }
          else if(error.error.message == 'Podany e-mail jest nie prawidłowy!') {
            this.invalidEmail = "Wrong Email!";
            this.registrationForm.controls['email'].setErrors({'incorrect': true});
          }
          else if(error.error.message == 'Podane hasło jest nie prawidłowe!') {
            this.invalidPassword = 'Wrong Password!';
            this.registrationForm.controls['password'].setErrors({'incorrect': true});
          }
        }
      );
  }

  getFormUsername() { return this.registrationForm.controls['username'].invalid; }

  getFormEmail() { return this.registrationForm.controls['email'].invalid; }

  getFormPassword() { return this.registrationForm.controls['password'].invalid; }

  getFormRepeatPassword() { return this.registrationForm.controls['repeatPassword'].invalid; }
}
