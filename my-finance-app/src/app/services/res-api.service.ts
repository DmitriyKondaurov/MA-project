import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {environment} from "../../environments/environment"
import {ITransactArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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

  getBalance(): Observable<number> {
    return this.http.get<number>(environment.apiUrl + '/api/balance')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      ;
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
