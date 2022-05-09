import { Injectable } from '@angular/core';
import { Transaction } from '../app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CostInfoService {

  transitions: Transaction[] = [];

  constructor() { }

  costInfo(data: Transaction[]): Transaction[] {
    data.forEach((id: Transaction) => {
      if ((id.expense.value === 'actual') && (id.type.value === 'costs')) {
        this.transitions.push(id)
      }
    })
    return this.transitions;
  }
}
