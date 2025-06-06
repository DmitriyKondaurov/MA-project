import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import {IBalance, ITransactArchive} from "../app-interfaces";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  transactionsRef?: AngularFireList<any>;
  transactionRef?: AngularFireObject<any>;
  balanceRef?: AngularFireObject<any>;
  private dbTransactionPath = '/transactionList';
  private dbCategoriesPath = '/categories';
  private dbBalancePath = '/balance';
  userUid = localStorage['uid'];

  constructor(private db: AngularFireDatabase) {
   }

  addTransaction(transaction: any) {
    this.transactionsRef = this.db.list(`users/${this.userUid}/${this.dbTransactionPath}`);
    this.transactionsRef?.push(transaction);
  }

  setBalance(balance: IBalance) {
    this.balanceRef = this.db.object(`users/${this.userUid}/${this.dbBalancePath}`);
    this.balanceRef?.set(balance);
  }

  getBalance(): AngularFireObject<IBalance> {
    this.balanceRef = this.db.object(`users/${this.userUid}/${this.dbBalancePath}`);
    return this.balanceRef;
  }

  getTransactions(): AngularFireList<any> {
    this.transactionsRef = this.db.list(`users/${this.userUid}/${this.dbTransactionPath}`);
    return this.transactionsRef;
  }

  getCategories() {
    this.transactionsRef = this.db.list(this.dbCategoriesPath);
    return this.transactionsRef;
  }

  getTransaction(id: string): any {
    this.transactionRef = this.db.object(`users/${this.userUid}/${this.dbTransactionPath}/${id}`);
    return this.transactionRef;
  }

  deleteTransaction(id: string): any {
    this.transactionRef = this.db.object(`users/${this.userUid}/${this.dbTransactionPath}/${id}`);
    return this.transactionRef.remove();
  }

  setGoal(goal: ITransactArchive) {
    this.transactionRef = this.db.object(`users/${this.userUid}/${this.dbTransactionPath}/${this.userUid}`);
    this.transactionRef?.set(goal);
  }

  getGoal(): any {
    this.transactionsRef = this.db.list(`users/${this.userUid}/${this.dbTransactionPath}`);
    return this.transactionsRef;
  }
}
