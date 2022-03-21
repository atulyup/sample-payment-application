import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import periods from '../transaction-history/periodic.json';

import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let transServ: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule],
      providers:[]
    }).compileComponents();

    transServ = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(transServ).toBeTruthy();
  });

  it('Testing Get be created', () => {
    localStorage.setItem('username', '7010049164');
    transServ.getBalance().subscribe(data=>{
      expect(data).toBe(2000);
    })
    const result=2000;
    const request = httpMock.expectOne(`${transServ.url}/getBalance/7010049164`);
    expect(request.request.method).toBe('GET');
    request.flush(result);
  });


  it('Testing POST be created', () => {
    localStorage.setItem('username', '7010049164');
    transServ.addMoney('7010049164',2500).subscribe(data=>{
      expect(data).toBe(true);
    })
    const result=true;
    const request = httpMock.expectOne(`${transServ.url}/addMoney`);
    expect(request.request.method).toBe('POST');
    request.flush(result);
  });

  it('Testing GET Transactions be created', () => {
    localStorage.setItem('username', '7010049164');
    transServ.getTransactions().subscribe((data:any)=>{
      expect(data.length).toBe(3);
    })
    const result=periods;
    const request = httpMock.expectOne(`${transServ.url}/getTransactions/7010049164`);
    expect(request.request.method).toBe('GET');
    request.flush(result);
  });



});
