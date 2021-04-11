import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  form!: FormGroup;
  role = ["user"];

  hide = true;
  isLoggedIn!: boolean;

  invalidUsername = 'Proszę podać nazwę użytkownika!';
  invalidEmail = 'Proszę podać e-mail!';
  invalidPassword = 'Proszę podać hasło!';
  invalidRepeatPassword = 'Proszę powtórzyć hasło!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
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

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.clear();

    if(this.f.password.value !== this.f.repeatPassword.value) {
      this.invalidRepeatPassword = 'Podane hasła muszą być identyczne!';
      this.form.controls['repeatPassword'].setErrors({'incorrect': true});
      return;
    }

    this.userService.registration(this.f.username.value, this.f.email.value, this.f.password.value, this.role)
      .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['../login'], { relativeTo: this.route})
          },
          error: error => {
            if(error.error.message == 'Użytkownik o podanej nazwie już istnieje!') {
              this.invalidUsername = error.error.message;
              this.form.controls['username'].setErrors({'incorrect': true});
            }
            else if(error.error.message == 'Użytkownik o podanym e-mailu już istnieje!') {
              this.invalidEmail = error.error.message;
              this.form.controls['email'].setErrors({'incorrect': true});
            }
            else if(error.error.message == 'Podany e-mail jest nie prawidłowy!') {
              this.invalidEmail = error.error.message;
              this.form.controls['email'].setErrors({'incorrect': true});
            }
            else if(error.error.message == 'Podane hasło jest nie prawidłowe!') {
              this.invalidPassword = 'Podane hasło jest nie prawidłowe, musi ono zawierać 8 znaków, małą i wielką literę, cyfrę oraz znak specjalny.';
              this.form.controls['password'].setErrors({'incorrect': true});
            }
          }
        });
  }

  clear() {
    this.invalidUsername = 'Proszę podać nazwę użytkownika!';
    this.invalidEmail = 'Proszę podać e-mail!';
    this.invalidPassword = 'Proszę podać hasło!';
    this.invalidRepeatPassword = 'Proszę powtórzyć hasło!';
  }
}
