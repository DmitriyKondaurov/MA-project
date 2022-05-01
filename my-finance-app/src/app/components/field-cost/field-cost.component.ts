import {Component, OnInit} from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";
import {RestApiService} from "../../services/res-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-field-cost',
  templateUrl: './field-cost.component.html',
  styleUrls: ['./field-cost.component.css']
})
export class FieldCostComponent implements OnInit {
  transactions: ITransactArchive[] = [];
  currDate: Date = new Date();
  totalCostAmount: number = 0;
  private subscriptionGetData: Subscription | undefined;

  constructor(private transactionsService: TransactionsService, private readonly restService: RestApiService) { }

  ngOnInit() {

    return this.subscriptionGetData = this.restService.getCostTransactions().subscribe((dataList: ITransactArchive[]) => {
      this.transactions = dataList;
    });

  }

}
