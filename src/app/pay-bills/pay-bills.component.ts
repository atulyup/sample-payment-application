import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.scss']
})
export class PayBillsComponent implements OnInit {
  paymentType: String = '';
  availableBalance: String = '0';
  operator: String = '';
  phoneNumber: String = '';
  amount: String = '';
  payLater = 'true';
  typeOfPayments = [
    { value: 'EB', showVal: 'Electricity Bill' },
    { value: 'MB', showVal: 'Mobile Bill' },
    { value: 'WB', showVal: 'Water Bill' },
    { value: 'DTH', showVal: 'DTH Loans' },
    { value: 'GB', showVal: 'Gas Bills' }
  ];

  constructor(private serv: TransactionsService) { }

  ngOnInit(): void {
    this.fetchBalance();
  }

  fetchBalance() {
    this.serv.getBalance().subscribe((data: any) => {
      this.availableBalance = data;
    })
  }


  payBills() {
    if (this.paymentType && this.amount) {
      const body = {
        'userName': localStorage.getItem('username'),
        'paymentType': this.paymentType,
        'amount': this.amount
      }
      this.serv.payBills(body).subscribe((data: any) => {
        alert('Bill Payed Successfully');
        this.fetchBalance();
      })
    } else {
      alert('Fill all required fields');
    }
  }


}
