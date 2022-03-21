import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication-service.service';

import { TopToolbarComponent } from './top-toolbar.component';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;
  let data = new BehaviorSubject(false);



  beforeEach(async () => {

    const authenticationStub={
      currentData: data.asObservable(),
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
      imports:[ MatToolbarModule, RouterTestingModule],
      declarations: [ TopToolbarComponent],
      providers:[{provide: AuthenticationServiceService, useValue: authenticationStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
