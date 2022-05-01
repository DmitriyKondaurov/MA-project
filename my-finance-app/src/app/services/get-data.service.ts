import { Categories } from './../categories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategories } from '../app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {}

  getData(): Observable<ICategories> {
    return this.http.get<ICategories>(`${environment.apiUrl}/api/categories`)
  }

}
