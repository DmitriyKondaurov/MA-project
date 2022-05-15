import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  transactionsRef?: AngularFireList<any>;
  transactionRef?: AngularFireObject<any>;
  private dbTransactionPath = '/transactionList';
  private dbCategoriesPath = '/categories';
  private dbBalancePath = '/balance';

  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {
   }

  addTransaction(transaction: any) {
    this.transactionsRef = this.db.list(`users/${this.auth.userUid}/${this.dbTransactionPath}`);
    this.transactionsRef?.push(transaction);
  }

  getTransactions(): AngularFireList<any> {
    this.transactionsRef = this.db.list(`users/${this.auth.userUid}/${this.dbTransactionPath}`);
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
    this.transactionRef = this.db.object(`users/${this.auth.userUid}/${this.dbTransactionPath}/${id}`);
    return this.transactionRef;
  }

  deleteTransaction(id: string): any {
    this.transactionRef = this.db.object(`users/${this.auth.userUid}/${this.dbTransactionPath}/${id}`);
    return this.transactionRef.remove();
  }

}
