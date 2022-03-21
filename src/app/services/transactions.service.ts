import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  url: String = "http://localhost:8080";
  httpHeader = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    })
  };


  constructor(private http: HttpClient) { }


  addMoney(username: String, availableBalance: Number) {
    const body = {
      'username': username,
      'amount': availableBalance
    }
    return this.http.post(this.url + "/addMoney", body);
  }

  getBalance(){
    return this.http.get(this.url+'/getBalance/'+ localStorage.getItem('username'));
  }

  sendMoney(data: any){
    const body = {
      'userName': data['userName'],
      'userNameTo': data['userNameTo'],
      'amount': data['amount']
    }
    return this.http.post(this.url + "/transfers", body);
  }

  getTransactions(){
    return this.http.get(this.url+'/getTransactions/'+localStorage.getItem('username'));
  }

  payBills(body:any){
    return  this.http.post(this.url+'/payBill', body);
  }

  deleteId(id: Number){
    return this.http.delete(this.url+ '/removeTransaction/'+ id);
  }



}
