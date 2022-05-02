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
    this.restService.getCostTransactions().subscribe((transactionList: ITransactArchive[]) => {
      this.transactions = transactionList;
      console.log('field cost',this.transactions[0].value)
      // let buffer: ITransactArchive[] = this.customReduce.customReduce(transactionList, 'Расходы', 'Факт', this.currDate);
      // buffer = this.customReduce.customSort(buffer);
      // buffer.length > 1 ? this.biggestCostAmount = buffer[0].value: this.biggestCostAmount = 0
    });
  }

}
