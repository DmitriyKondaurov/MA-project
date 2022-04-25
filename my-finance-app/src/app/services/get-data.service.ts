import { Categories } from './../categories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {}

  getData(): Observable<Categories> {
    return this.http.get<Categories>('../../../assets/category.json')
  }

}
