import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import periods from '../transaction-history/periodic.json';
import { TransferMoneyComponent } from './transfer-money.component';

describe('TransferMoneyComponent', () => {
  let component: TransferMoneyComponent;
  let fixture: ComponentFixture<TransferMoneyComponent>;

  beforeEach(async () => {
    const transactionsStub = {
      addMoney() {
        return of(true);
      },
      getBalance() {
        return of('2000');
      },
      sendMoney(data: any){
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
      declarations: [ TransferMoneyComponent ],
      providers:[{provide: TransactionsService, useValue: transactionsStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('submit test create', () => {
    spyOn(window, 'alert');
    component.payLater = 'true';
    component.amount='2000';
    component.phoneNumber='7010049164';
    localStorage.setItem('username', '7010049164');
    component.sendMoney();
    expect(component.availableBalance).toBe('2000');
  });

});
