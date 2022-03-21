import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import periods from '../transaction-history/periodic.json';
import { TransactionHistoryComponent } from './transaction-history.component';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

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
      imports:[],
      declarations: [ TransactionHistoryComponent ],
      providers:[{provide: TransactionsService, useValue: transactionsStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
