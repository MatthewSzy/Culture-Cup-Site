import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoggedIn!: boolean;
  hide = true;
  form!: FormGroup;

  username!: string;
  id = '0';

  invalidPassword = 'Proszę podać hasło!';
  errorInfo = false;
  errorDelete = 'Coś poszło nie tak!';

  constructor(
      private formBuilder: FormBuilder,
      private tokenStorageService: TokenStorageService,
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
        password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;
      this.username = user.username;
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route})
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.clear();

    this.userService.auth(this.username, this.f.password.value).subscribe(
      data => {
        this.userService.delete(this.id).subscribe(
          leave => {
            this.logout();
            this.router.navigate(['**'], { relativeTo: this.route})
          },
          error => {
            if(error.error.message == 'Podany użytkownik nie został odnaleziony!') {
              this.invalidPassword = error.error.message;
              this.form.controls['password'].setErrors({'incorrect': true});
            }
          }
        )
      },
      error => {
        this.invalidPassword = 'Podane hasło jest błędne!';
        this.form.controls['password'].setErrors({'incorrect': true});
      }
    )
  }

  clear() {
    this.invalidPassword = 'Proszę podać hasło!';
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
