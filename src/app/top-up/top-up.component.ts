import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent implements OnInit {
  topUpForm: FormGroup;
  year: Number[]=[];
  months = [
    { value: 'Jan' },
    { value: 'February' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
    { value: 'August' },
    { value: 'September' },
    { value: 'October' },
    { value: 'November' },
    { value: 'December' }
  ];
  constructor(private fb: FormBuilder, private serv: TransactionsService) { }

  ngOnInit() {
    this.topUpForm = this.fb.group({
      amountAdded: ['', Validators.required],
      nameCardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      selectedMonth: ['', Validators.required],
      selectedYear: ['', Validators.required],
      cardType: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    const currentYear = new Date().getFullYear();
    for(let i= currentYear; i <= currentYear+30;i++){
      this.year.push(i);
    }
  }

  selectCardType(val: String) {
    this.topUpForm.controls['cardType'].setValue(val);
    console.log('Card Type Selected:', this.topUpForm.controls['cardType'].value);
  }

  checkFormValid(){
    return this.topUpForm.valid;
  }

  get f(){
    return this.topUpForm.controls;
  }

  resetForm() {
    this.topUpForm.reset();
    this.topUpForm.markAsPristine();
    this.topUpForm.markAsUntouched();
  }

  lettersOnly(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }

  numbersOnly(event: any) {
    console.log('Event is:', event);
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  addMoney(){
    if(this.topUpForm.valid){
      const amount= Number(this.topUpForm.controls['amountAdded'].value);
      const userName= localStorage.getItem('username')|| '';
      this.serv.addMoney(userName, amount).subscribe((data:any )=>{
        console.log('Amount Added:', data);
        alert('Amount'+amount+'Successfully Added to Wallet!');
      },(err=>{
        console.log('Error Adding Amount');
        alert('Error Occured During Wallet Load. Please try again!')
      }));
    }
  }

}

