import {Component, Input, OnInit} from '@angular/core';
import {ICostArchive} from "../../app-interfaces";

@Component({
  selector: 'app-field-cost',
  templateUrl: './field-cost.component.html',
  styleUrls: ['./field-cost.component.css']
})
export class FieldCostComponent implements OnInit {
@Input() transactions: ICostArchive[] = [];
firstBiggest: ICostArchive[] = [];

constructor() { }

  ngOnInit(): void {
    this.reduceTransactions(this.transactions);
    this.sortTransactions(this.transactions);
    this.firstBiggest = this.transactions.slice(0, 5)
  }

  reduceTransactions(curTransactions: ICostArchive[]) {
    let totalByCategories: ICostArchive[] = [];
    curTransactions.forEach((item): void => {
      let index = totalByCategories.findIndex((i) => i.categoryName == item.categoryName)
      if (index >= 0) {
        totalByCategories[index].value += item.value;
      } else {
        totalByCategories.push(item);
      }
    })
  }

  sortTransactions(curTransactions: ICostArchive[]) {
    curTransactions = curTransactions.sort((a, b) => {
      return b.value - a.value
    })
    return curTransactions
}

}
