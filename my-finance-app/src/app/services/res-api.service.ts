import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {environment} from "../../environments/environment"
import {ICategories, ITransactArchive, IBalance} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'body',
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  getCostTransactions(): Observable<ITransactArchive[]> {
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

  getData(): Observable<ICategories> {
    return this.http.get<ICategories>(`${environment.apiUrl}/api/categories`)
  }


  sendTest(test: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/test`, test)
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
