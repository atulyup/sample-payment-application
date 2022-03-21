import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import periods from '../transaction-history/periodic.json';

import { TopUpComponent } from './top-up.component';

describe('TopUpComponent', () => {
  let component: TopUpComponent;
  let fixture: ComponentFixture<TopUpComponent>;

  beforeEach(async () => {
    const transactionsStub = {
      addMoney() {
        return of(true);
      },
      getBalance() {
        return of(2000);
      },
      sendMoney(){
        return of(true);
      },
      getTransactions(){
        return of(periods);
      },
      payBills(){
        return of(true);
      },
      deleteId(id: Number){
        return of(true);
      }
    };
    await TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule,RouterTestingModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule],
      declarations: [ TopUpComponent ],
      providers:[{provide: TransactionsService, useValue: transactionsStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Card Type only create', () => {
    component.selectCardType('abc');
    expect(component.topUpForm.controls['cardType'].value).toBe('abc');
  });
  it('Submit call', () => {
    spyOn(window, 'alert');

    component.topUpForm.controls['amountAdded'].setValue('2000');
    component.topUpForm.controls['nameCardHolder'].setValue('Atul');
    component.topUpForm.controls['cardNumber'].setValue('123456789123456');
    component.topUpForm.controls['selectedMonth'].setValue('Jan');
    component.topUpForm.controls['selectedYear'].setValue('2022');
    component.topUpForm.controls['cardType'].setValue('MasterCard');
    component.topUpForm.controls['cvv'].setValue('131');
    component.addMoney();
    expect(window.alert).toHaveBeenCalledWith('Amount2000Successfully Added to Wallet!');
  });
  it('Form Test', () => {
    component.resetForm();
    expect(component.topUpForm.pristine).toBeTruthy();
  });

  it('Function Numbers Only Test', () => {
    const event={
      which: false,
      keyCode: 32,
      preventDefault(){
        return false
      }
    }
    const result= component.numbersOnly(event);
    console.log('Result:', result)
    expect(result).toBeFalsy();
  });

  it('Function Letters Only Test', () => {
    const event={
      which: false,
      keyCode: 54,
      preventDefault(){
        return false
      }
    }
    var result= component.lettersOnly(event);
    console.log('Result Letters:', result)
    expect(result).toBeFalsy();
  });




});
