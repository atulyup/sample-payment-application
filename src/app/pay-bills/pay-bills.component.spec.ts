import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import periods from '../transaction-history/periodic.json';
import { PayBillsComponent } from './pay-bills.component';

describe('PayBillsComponent', () => {
  let component: PayBillsComponent;
  let fixture: ComponentFixture<PayBillsComponent>;

  beforeEach(async () => {
    const transactionsStub = {
      addMoney() {
        return of(true);
      },
      getBalance() {
        return of('2000');
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
      imports:[],
      declarations: [ PayBillsComponent ],
      providers:[{provide: TransactionsService, useValue: transactionsStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Submit Test Case create', () => {
    localStorage.setItem('username','7010049164');
    component.paymentType='Electricity Bill';
    component.amount='2000';
    component.payBills();

    expect(component.availableBalance).toBe('2000');
  });

});
