import { Injectable } from '@angular/core';
import {ITransactArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  customReduce(curTransactions: ITransactArchive[]): ITransactArchive[] {
    let totalByCategories: ITransactArchive[] = [];
    const date: Date = new Date();
    curTransactions.forEach((item): void => {
      let index = totalByCategories.findIndex((i) => i.categoryName === item.categoryName)
      if (index >= 0) {
        totalByCategories[index].value += item.value;
      } else if (item.planFact === 'Факт'
        && item.flowDirection === 'Расходы'
      && new Date(item.date).getMonth() === date.getMonth()) {
        totalByCategories.push(item);
      }
    })
    return totalByCategories;
  }

  customSort(curTransactions: ITransactArchive[]) {
    curTransactions = curTransactions.sort((a, b) => {
      return b.value - a.value
    })
    return curTransactions
  }
}
