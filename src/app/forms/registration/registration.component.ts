import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: [''],
      email: [''],
      password: [''],
      repeatPassword: ['']
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.f.email.value)
    console.log(this.f.password.value)
    console.log(this.f.repeatPassword.value)
  }
}
