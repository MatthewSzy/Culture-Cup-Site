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
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUserName: [''],
      password: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    var user: UserLogin = this.form.value;

    this.loading = true;
    this.accountService.login(user)
      .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['**'], { relativeTo: this.route})
          },
          error: error => {
            console.log(error.error.message)
            this.loading = false;
            this.submitted = false;
          }
        });
  }
}
