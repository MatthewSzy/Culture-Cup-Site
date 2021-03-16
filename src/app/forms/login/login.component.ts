import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { UserLogin } from 'src/app/account/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  loading = false;
  submitted = false;

  invalidEmailOrUserName = 'Proszę podać nazwę użytkownika lub e-mail!';
  invalidPassword = 'Proszę podać hasło!';
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { 
    this.form = this.formBuilder.group({
      emailOrUserName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) { return; }
    
    this.clear();
    var user: UserLogin = this.form.value;

    this.loading = true;
    this.accountService.login(user)
      .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['**'], { relativeTo: this.route})
          },
          error: error => {
            this.invalidEmailOrUserName = error.error.message;
            this.form.controls['emailOrUserName'].setErrors({'incorrect': true});
            this.loading = false;
            this.submitted = false;
          }
        });
  }

  clear() {
    this.invalidEmailOrUserName = 'Proszę podać nazwę użytkownika lub e-mail!';
    this.invalidPassword = 'Proszę podać hasło!';
  }
}
