import { Injectable } from '@angular/core';
import { Transaction } from '../app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CostInfoService {

  transitions: Transaction[] = [];

  constructor() { }

  costInfo(data: Transaction[]): Transaction[] {
    console.log(data, 'data');
    data.forEach((id: Transaction) => {
      console.log(id, 'id')
      if ((id.expense.value === 'actual') && (id.type.value === 'costs')) {
        this.transitions.push(id)
      }
    })
    console.log(this.transitions, 'trams')
    return this.transitions;
  }
}
