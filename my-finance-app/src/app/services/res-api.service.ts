import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  transactionsRef?: AngularFireList<any>;
  private dbTransactionPath = '/transaction-list';
  private dbCategoriesPath = '/categories';
  private dbBalancePath = '/balance';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
   }

  addTransaction(transaction: any) {
    this.transactionsRef = this.db.list(this.dbTransactionPath);
    this.transactionsRef?.push(transaction);
  }

  getTransactions() {
    this.transactionsRef = this.db.list(this.dbTransactionPath);
    return this.transactionsRef;
  }

  getCategories() {
    this.transactionsRef = this.db.list(this.dbCategoriesPath);
    return this.transactionsRef;
  }

  getBalanceAmount() {
    this.transactionsRef = this.db.list(this.dbBalancePath);
    return this.transactionsRef;
  }

  // sendTest(test: any): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/api/test`, test)
  // }

  send(form: any) {
    console.log(form);
    return this.http.get('https://financy-6ebf1-default-rtdb.europe-west1.firebasedatabase.app/f.json', form);
  }

}
