import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formSubmitted = false;
  form: FormGroup;
  error: String = '';
  constructor(private fb: FormBuilder, private serv: AuthenticationServiceService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  get f() {
    return this.form.controls;
  }
  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.serv.addUser(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(data => {
        console.log('Data is:', data);
        this.error = '';
        alert('Registration Sucess! Please proceed to login')
        this.router.navigate(['login']);
      }, (error) => {
        this.error = 'Registration Failed. User Already Exists';
      });
    }
  }

}
