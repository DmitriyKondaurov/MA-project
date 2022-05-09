import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
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

}
