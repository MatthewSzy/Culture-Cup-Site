import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
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

  invalidPassword = 'Proszę podać hasło!';

  constructor(
      private formBuilder: FormBuilder,
      private tokenStorageService: TokenStorageService,
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router
  ) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.form = this.formBuilder.group({
        password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  onSubmit() {
  }
}
