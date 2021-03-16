import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { clear } from 'node:console';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { UserRegister } from 'src/app/account/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  form!: FormGroup;
  hide = true;
  loading = false;
  submitted = false;

  invalidUserName = 'Proszę podać nazwę użytkownika!';
  invalidEmail = 'Proszę podać e-mail!';
  invalidPassword = 'Proszę podać hasło!';
  invalidRepeatPassword = 'Proszę powtórzyć hasło!';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { 
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.clear();
    var user: UserRegister = this.form.value;

    this.loading = true;
    this.accountService.registration(user)
      .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['../login'], { relativeTo: this.route})
          },
          error: error => {
            if(error.error.message == 'Użytkownik o podanej nazwie użytkownika już istnieje!') {
              this.invalidUserName = error.error.message;
              this.form.controls['userName'].setErrors({'incorrect': true});
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
            else if(error.error.message == 'Podane hasła muszą być identyczne!') {
              this.invalidRepeatPassword = error.error.message;
              this.form.controls['repeatPassword'].setErrors({'incorrect': true});
            }

            this.loading = false;
            this.submitted = false;
          }
        });
  }

  clear() {
    this.invalidUserName = 'Proszę podać nazwę użytkownika!';
    this.invalidEmail = 'Proszę podać e-mail!';
    this.invalidPassword = 'Proszę podać hasło!';
    this.invalidRepeatPassword = 'Proszę powtórzyć hasło!';
  }
}
