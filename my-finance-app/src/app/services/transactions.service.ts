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

  reduceByCategory(transactions: ITransactArchive[]): ITotalByCategory[] {
    let totalByCategories: ITotalByCategory[] = [];
    transactions.reduce((acc, curr) => {
      const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
      if (index >= 0) {
        acc[index].value += curr.amount;
        return acc
      } else {
        const missCategory: ITotalByCategory = {
          categoryName: curr.categoryName,
          value: curr.amount,
          flow: curr.type.value
        }
        acc.push(missCategory);
        return acc;
      }
    }, totalByCategories)
    return totalByCategories;
  }

  customReduceByMonth(curTransactions: ITransactArchive[]): IMonth[] {
    const totalByMonths: IMonth[] = [
      { title:'January', value:1, total: 0 },
      { title:'February', value:2, total: 0 },
      { title:'March', value:3, total: 0 },
      { title:'April', value:4, total: 0 },
      { title:'May', value:5, total: 0 },
      { title:'June', value:6, total: 0 },
      { title:'July', value:7, total: 0 },
      { title:'August', value:8, total: 0 },
      { title:'September', value:9, total: 0},
      { title:'October', value:10, total: 0 },
      { title:'November', value:11, total: 0 },
      { title:'December', value:12, total: 0 },
    ]

      curTransactions.reduce((acc, curr):IMonth[] => {
          const indexInAcc: number = acc.findIndex((i) => i.value === new Date(curr.date).getMonth() + 1 )
          if (indexInAcc >= 0) {
            acc[indexInAcc].total += curr.amount;
            return acc
          } else return acc;

        }, totalByMonths)

    return totalByMonths;
  }

  biggestCategoryAmount(transactions: ITransactArchive[], flow: string, planFact: string, date: Date) {
    const reducedTransactions = this.customReduce(transactions, flow, planFact, date)
    if(this.customSort(reducedTransactions)[0] === undefined) {
      return 0
    } else return this.customSort(reducedTransactions)[0].amount;
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
      return (new Date(item.date).getMonth() + 1) === month;
    })
  }
  filterByFlow(transactions: ITransactArchive[], flowDirection: "costs" | "income" | "") {
    return transactions.filter((item) => {
      return item.type.value === flowDirection;
    })
  }
  filterByPlanActual(transactions: ITransactArchive[], planActual: "planned" | "actual") {
    return transactions.filter((item) => {
      return item.expense.value === planActual;
    })
  }

}
