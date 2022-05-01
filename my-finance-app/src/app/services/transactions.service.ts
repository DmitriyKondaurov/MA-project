import { Injectable } from '@angular/core';
import {ITransactArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  customReduce(curTransactions: ITransactArchive[], flow: string, planFact: string, date: Date): ITransactArchive[] {
    let totalByCategories: ITransactArchive[] = [];
    curTransactions.forEach((item): void => {
      if (item.planFact === planFact
        && item.flowDirection === flow
        && new Date(item.date).getMonth() === date.getMonth()) {
        let index = totalByCategories.findIndex((i) => i.categoryName === item.categoryName)
        if (index >= 0) {
          totalByCategories[index].value += item.value;
        } else totalByCategories.push(item)
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
