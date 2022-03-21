import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication-service.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let data = new BehaviorSubject(false);
  let currentData = data.asObservable()   


  beforeEach(async () => {
    const authenticationStub={
      addUser(){
        return of('Added user with id 1')
      },
      sendLoginRequest(){
        return of(true);
      },
      setData(data1: boolean) {
        data.next(data1);
      }    
    }
    await TestBed.configureTestingModule({
      imports:[MatCardModule, MatInputModule, ReactiveFormsModule, FormsModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ RegistrationComponent ],
      providers:[{provide: AuthenticationServiceService, useValue: authenticationStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
