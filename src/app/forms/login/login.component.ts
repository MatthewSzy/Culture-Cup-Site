import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUserName: [''],
      password: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.f.email.value)
    console.log(this.f.password.value)
  }
}
