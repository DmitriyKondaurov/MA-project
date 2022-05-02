import { Injectable } from '@angular/core';
import {ITotalByCategory, ITransactArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  customReduce(curTransactions: ITransactArchive[], flow: string, planFact: string, date?: Date): ITransactArchive[] {
    let totalByCategories: ITransactArchive[] = [];

    if (date) {
      curTransactions
        .filter((item) => item.planFact === planFact)
        .filter((item) => item.flowDirection === flow)
        .filter((item) => new Date(item.date).getMonth() === date.getMonth())
        .reduce((acc, curr):ITransactArchive[] => {
          const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
                if (index >= 0) {
                  acc[index].value += curr.value;
                  return acc
                } else {
                  acc.push(curr);
                  return acc;
                }
        }, totalByCategories)
    } else {
      curTransactions
        .filter((item) => item.planFact === planFact)
        .filter((item) => item.flowDirection === flow)
        .reduce((acc, curr):ITransactArchive[] => {
          const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
          if (index >= 0) {
            acc[index].value += curr.value;
            return acc
          } else {
            acc.push(curr);
            return acc;
          }
        }, totalByCategories)
    }

    return totalByCategories;
  }

  customSort(curTransactions: ITransactArchive[]) {
    curTransactions = curTransactions.sort((a, b) => {
      return b.value - a.value
    })
    return curTransactions
  }
}
