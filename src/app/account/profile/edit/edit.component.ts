import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form!: FormGroup;
  isLoggedIn!: boolean;
  username?: string;
  email?: string;
  creationDate?: Date;
  roles: string[] = [];

  invalidUsername = 'Proszę podać nazwę użytkownika!';
  invalidEmail = 'Proszę podać e-mail!';

  constructor(
      private formBuilder: FormBuilder,
      private tokenStorageService: TokenStorageService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router
  ) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.email = user.email;
      this.creationDate = user.creationDate;
      this.roles = user.roles;

      this.form.patchValue(user);
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route})
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.clear();

    this.authService.update(this.f.username.value, this.f.email.value).subscribe(
      data => {
        this.tokenStorageService.saveUser(data);
        window.location.reload();
      },
      error => {
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
      }
    );
  }

  clear() {
    this.invalidUsername = 'Proszę podać nazwę użytkownika!';
    this.invalidEmail = 'Proszę podać e-mail!';
  }
}
