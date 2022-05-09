import { Injectable } from '@angular/core';
import {ITransactArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  customReduce(curTransactions: ITransactArchive[], flow: string, planFact: string, date?: Date): ITransactArchive[] {
    let totalByCategories: ITransactArchive[] = [];

    if (date) {
      curTransactions
        .filter((item) => item.expense.value === planFact)
        .filter((item) => item.type.value === flow)
        .filter((item) => new Date(item.date).getMonth() === date.getMonth())
        .reduce((acc, curr):ITransactArchive[] => {
          const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
                if (index >= 0) {
                  acc[index].amount += curr.amount;
                  return acc
                } else {
                  acc.push(curr);
                  return acc;
                }
        }, totalByCategories)
    } else {
      curTransactions
        .filter((item) => item.expense.value === planFact)
        .filter((item) => item.type.value === flow)
        .reduce((acc, curr):ITransactArchive[] => {
          const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
          if (index >= 0) {
            acc[index].amount += curr.amount;
            return acc
          } else {
            acc.push(curr);
            return acc;
          }
        }, totalByCategories)
    }

    return totalByCategories;
  }

  biggestCategoryAmount(curTransactions: ITransactArchive[], flow: string, planFact: string, date: Date) {
    const reducedTransactions = this.customReduce(curTransactions, flow, planFact, date)
    return this.customSort(reducedTransactions)[0].amount
  }


  customSort(curTransactions: ITransactArchive[]) {
    curTransactions = curTransactions.sort((a, b) => {
      return b.amount - a.amount
    })
    return curTransactions
  }
}
