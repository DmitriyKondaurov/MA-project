import { Injectable } from '@angular/core';
import {ICostArchive} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  customReduce(curTransactions: ICostArchive[]): ICostArchive[] {
    let totalByCategories: ICostArchive[] = [];
    curTransactions.forEach((item): void => {
      let index = totalByCategories.findIndex((i) => i.categoryName == item.categoryName)
      if (index >= 0) {
        totalByCategories[index].value += item.value;
      } else {
        totalByCategories.push(item);
      }
    })
    return totalByCategories;
  }

  customSort(curTransactions: ICostArchive[]) {
    curTransactions = curTransactions.sort((a, b) => {
      return b.value - a.value
    })
    return curTransactions
  }
}
