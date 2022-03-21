import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: String = '';
  formSubmitted = false;
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
      console.log('Theses are the values:', this.form.value);
      this.serv.sendLoginRequest(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((data: any) => {
        console.log('Data is:', data);
        this.error = '';
        localStorage.setItem('loggedInUser', 'true');
        this.serv.setData(true);
        localStorage.setItem('username', data['username']);
        this.router.navigate(['home']);
      }, (error) => {
        this.error = 'Username & password combination does not match';
      });
    }
  }


}
