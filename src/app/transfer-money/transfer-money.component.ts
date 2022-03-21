import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent implements OnInit {
  availableBalance: String = '0';
  phoneNumber: String = '';
  amount: String = '';
  payLater = 'true';
  minDate = new Date();
  constructor(private serv: TransactionsService) { }

  ngOnInit(): void {
    this.fetchBalance();
  }

  fetchBalance() {
    this.serv.getBalance().subscribe((data: any) => {
      this.availableBalance = data;
    })
  }

  sendMoney() {
    if (this.payLater !== 'true') {
      alert('Scheduled for payment!');
    } else {
      if (this.amount && this.phoneNumber) {
        const data = {
          amount: this.amount,
          userName: localStorage.getItem('username'),
          userNameTo: this.phoneNumber
        }
        this.serv.sendMoney(data).subscribe((data: any) => {
          alert('Successfully Transferred!',)
          this.fetchBalance();
        }, (error) => {
          alert('Problem Occured. Please check the number and try again!');
        });
      } else {
        alert('Problem Occured. Please check the number and try again!');
      }
    }
  }




}
