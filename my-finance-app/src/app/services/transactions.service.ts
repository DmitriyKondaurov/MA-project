import { Injectable } from '@angular/core';
import {IMonth, ITotalByCategory, ITransactArchive} from "../app-interfaces";
import months from "../components/report-plan-actual/report-plan-actual/months";

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

  customReduceByMonth(curTransactions: ITransactArchive[]): IMonth[] {
    let totalByMonths: IMonth[] = [... months];

      curTransactions.reduce((acc, curr):IMonth[] => {
        const index = new Date(curr.date).getMonth();
        acc[index].total += curr.amount;
        return acc;
        }, totalByMonths)

    return totalByMonths;
  }

  biggestCategoryAmount(transactions: ITransactArchive[], flow: string, planFact: string, date: Date) {
    const reducedTransactions = this.customReduce(transactions, flow, planFact, date)
    return this.customSort(reducedTransactions)[0].amount
  }


  customSort(transactions: ITransactArchive[]) {
    transactions = transactions.sort((a, b) => {
      return b.amount - a.amount
    })
    return transactions
  }

  filterByYear(transactions: ITransactArchive[], year: number) {
    return transactions.filter((item) => {
      return new Date(item.date).getFullYear() === year;
    })
  }
  filterByMonth(transactions: ITransactArchive[], month: number) {
    return transactions.filter((item) => {
      return new Date(item.date).getMonth() === month;
    })
  }
  filterByFlow(transactions: ITransactArchive[], flowDirection: "costs" | "income") {
    return transactions.filter((item) => {
      return item.type.value === flowDirection;
    })
  }
  filterByPlanActual(transactions: ITransactArchive[], planActual: "planned" | "actual") {
    return transactions.filter((item) => {
      return item.expense.value === planActual;
    })
  }
  filterByCategory(transactions: ITransactArchive[], category: string) {
    return transactions.filter((item) => {
      return item.categoryName === category;
    })
  }
}
