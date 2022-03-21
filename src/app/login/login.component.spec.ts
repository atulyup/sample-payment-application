import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication-service.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let data = new BehaviorSubject(false);
  let currentData = data.asObservable()   


  beforeEach(async () => {
    const authenticationStub={
      addUser(){
        return of('Added user with id 1')
      },
      sendLoginRequest(username: string, password: string){
        return of({username: username, foundUser: true});
      },
      setData(data1: boolean) {
        data.next(data1);
      }    

    }

    await TestBed.configureTestingModule({
      imports:[MatCardModule, MatInputModule, ReactiveFormsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule], 
      declarations: [ LoginComponent ],
      providers:[{provide: AuthenticationServiceService, useValue: authenticationStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    component.formSubmitted=true;
    component.form.controls['username'].setValue('7010049164');
    component.form.controls['password'].setValue('atul');
    component.submit();
    expect(localStorage.getItem('username')).toBe('7010049164');
  });

});
