import { Injectable } from '@angular/core';
import { Transaction } from '../app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MonitoringInfoService {

  transitions: Transaction[] = [];

  constructor() { }

  monitoringInfo( data: Transaction[]) {
    data.forEach( (id: Transaction) => {
      if (id.expense.value === 'actual') this.transitions.push(id)
    } )
    return this.transitions;
  }
}
