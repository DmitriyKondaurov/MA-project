import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../environments/environment"
import {ICategories, ITransactArchive, IBalance} from "../app-interfaces";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  transactionsRef?: AngularFireList<any>;
  private dbTransactionPath = '/transaction-list';
  private dbCategoriesPath = '/categories';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'body',
    responseType: 'json'
  };

  constructor(private http: HttpClient, private db: AngularFireDatabase) { 
   }

  addTransaction(transaction: any) {
    this.transactionsRef?.push(transaction);
  }

  getTransactions() {
    this.transactionsRef = this.db.list(this.dbTransactionPath);
    return this.transactionsRef;
  }

  getData() {
    this.transactionsRef = this.db.list(this.dbCategoriesPath);
    return this.transactionsRef;
  }

  getAllTransactions(): Observable<ITransactArchive[]> {
    return this.http.get<ITransactArchive[]>(environment.apiUrl + '/api/transactions')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      ;
  }

  getBalance(): Observable<IBalance> {
    return this.http.get<IBalance>(environment.apiUrl + '/api/balance')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      ;
  }

  // getData(): Observable<ICategories> {
  //   return this.http.get<ICategories>(`${environment.apiUrl}/api/categories`)
  // }

  getTest(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/test`);
  }

  sendTest(test: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/test`, test)
  }

  send(form: any) {
    console.log(form);
    return this.http.get('https://financy-6ebf1-default-rtdb.europe-west1.firebasedatabase.app/f.json', form);
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
