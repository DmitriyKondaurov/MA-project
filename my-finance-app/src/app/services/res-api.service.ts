import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  transactionsRef?: AngularFireList<any>;
  transactionRef?: AngularFireObject<any>;
  private dbTransactionPath = '/transactionList';
  private dbCategoriesPath = '/categories';
  private dbBalancePath = '/balance';

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
   }

  addTransaction(transaction: any, uid: string) {
    this.transactionsRef = this.db.list(`users/${uid}/${this.dbTransactionPath}`);
    this.transactionsRef?.push(transaction);
  }

  getTransactions(): AngularFireList<any> {
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

  getTransaction(id: string): any {
    this.transactionRef = this.db.object(`${this.dbTransactionPath}/${id}`);
    return this.transactionRef;
  }

  deleteTransaction(id: string): any {
    this.transactionRef = this.db.object(`${this.dbTransactionPath}/${id}`);
    return this.transactionRef.remove();
  }

}
