import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from '../services/transactions.service';
import periods from '../transaction-history/periodic.json';
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns: string[]=[];
  periodicElements: TransactionResult[]= periods;
  dataSource= this.periodicElements;
  
  constructor(private serv: TransactionsService) { 
    this.displayedColumns= ['paymentType', 'transactionNumber', 'status','amount','cancel'];
  }
  ngOnInit(): void {
    this.getLatestTransactions();
  }
  removeElement(data:any){
    console.log('Element:', data);
    this.serv.deleteId(data.id).subscribe((data:any)=>{
      alert('Removed Transaction!');
      this.getLatestTransactions();
    })

  }

  getLatestTransactions(){
    this.serv.getTransactions().subscribe((data:any)=>{
      this.dataSource= data;
    })

  }

}

export interface TransactionResult{
    id: Number,
    userName: String,
    paymentType: String,
    transactionNumber: Number,
    status: String,
    amount: Number,
    availableBalance: Number
}

