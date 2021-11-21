import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm!: FormGroup;

  isLoggedIn!: boolean;
  userId!: string;
  username!: string;
  email!: string;
  creationDate!: Date;
  roles: string[] = [];

  hide = true;
  invalidUsername = 'Empty Username!';
  invalidEmail = 'Empty Email!';
  invalidPassword = 'Empty Password!';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userId = user.userId;
    
      this.editForm.patchValue(user);
    }
    else {
      this.router.navigate(['../login'], { relativeTo: this.route })
    }
  }

  update() {
    if (this.editForm.invalid) return;
    this.invalidUsername = 'Empty Username!';
    this.invalidEmail = 'Empty Email!';
    this.invalidPassword = 'Empty Password!';

    this.userService.update(this.userId, this.editForm.controls['username'].value, this.editForm.controls['firstname'].value, this.editForm.controls['lastname'].value, this.editForm.controls['email'].value, this.editForm.controls['password'].value).subscribe(
      response => {
        this.tokenStorageService.saveToken(response.token);

        let userData: any = jwtDecode(response.token);
        this.tokenStorageService.saveUser(userData.UserData);
        window.location.reload();
      },
      error => {
        if(error.error.message == 'Użytkownik o podanej nazwie już istnieje!') {
          this.invalidUsername = "Exist Username!";
          this.editForm.controls['username'].setErrors({'incorrect': true});
        }
        else if(error.error.message == 'Podana nazwa użytkownika jest nie prawidłowy!') {
          this.invalidUsername = "Wrong Username!";
          this.editForm.controls['username'].setErrors({'incorrect': true});
        }
        else if(error.error.message == 'Użytkownik o podanym e-mailu już istnieje!') {
          this.invalidEmail = "Exist Email!";
          this.editForm.controls['email'].setErrors({'incorrect': true});
        }
        else if(error.error.message == 'Podany e-mail jest nie prawidłowy!') {
          this.invalidEmail = "Wrong Email!";
          this.editForm.controls['email'].setErrors({'incorrect': true});
        }
        else if (error.error.message == 'Bad credentials') {
          this.invalidPassword = 'Wrong Password!';
            this.editForm.controls['password'].setErrors({'incorrect': true});
        }
      }
    );
  }
}
