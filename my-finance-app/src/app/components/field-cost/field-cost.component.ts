import {Component, Input, OnInit} from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";
import {RestApiService} from "../../services/res-api.service";
import {Subscription} from "rxjs";
import {TransactionsService} from "../../services/transactions.service";

@Component({
  selector: 'app-field-cost',
  templateUrl: './field-cost.component.html',
  styleUrls: ['./field-cost.component.css']
})
export class FieldCostComponent implements OnInit {
  transactions: ITransactArchive[] = [];
  currDate: Date = new Date();
  biggestCostAmount: number = 0;

  constructor(private readonly restService: RestApiService, private customReduce: TransactionsService) { }

  ngOnInit() {
    this.restService.getAllTransactions().subscribe((transactionList: ITransactArchive[]) => {
      this.transactions = this.customReduce
        .customReduce(transactionList, 'Расходы', 'Факт', this.currDate)
        .slice(0, 6).sort( (a, b) => b.value - a.value)
      this.biggestCostAmount = this.customReduce.biggestCategoryAmount(this.transactions, 'Расходы', 'Факт', this.currDate)
      console.log('biggest',this.biggestCostAmount)
      console.log('field cost',this.transactions)
    });
  }

}
