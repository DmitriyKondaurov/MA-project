import { Component, OnInit } from '@angular/core';
import {IFrontPageItem, ITransactArchive} from 'src/app/app-interfaces';
import {Subscription} from "rxjs";
import {TransactionsService} from "../../../services/transactions.service";
import {RestApiService} from "../../../services/res-api.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private subscriptionGetData: Subscription | undefined;
  currDate: Date = new Date();
  income: IFrontPageItem = {
    name:'Надходження',
    value: 0,
    total: 0,
  };

  goal: IFrontPageItem = {
    name:'',
    value: 0,
    total: 0,
  };

  cost: IFrontPageItem = {
    name:'Витрати',
    value: 0,
    total: 0,
  };

  constructor(private transactionsService: TransactionsService, private readonly restService: RestApiService) { }

  ngOnInit() {
    return this.subscriptionGetData = this.restService.getCostTransactions().subscribe((dataList: ITransactArchive[]) => {

      let incomeTransReduce = this.transactionsService.customReduce(dataList, 'Доходы', 'Факт', this.currDate);
      this.income.value = incomeTransReduce.reduce((acc, curr) => acc += curr.value, 0)
      incomeTransReduce = this.transactionsService.customReduce(dataList, 'Доходы', 'План', this.currDate);
      this.income.total = incomeTransReduce.reduce((acc, curr) => acc += curr.value, 0)

      let costTransReduce = this.transactionsService.customReduce(dataList, 'Расходы', 'Факт', this.currDate);
      this.cost.value = costTransReduce.reduce((acc, curr) => acc += curr.value, 0)
      costTransReduce = this.transactionsService.customReduce(dataList, 'Расходы', 'План', this.currDate);
      this.cost.total = costTransReduce.reduce((acc, curr) => acc += curr.value, 0)

      costTransReduce = this.transactionsService.customReduce(dataList, 'Расходы', 'План');
      let index = costTransReduce.findIndex((item) => item.categoryName === 'Цели')
      this.goal.name = costTransReduce[index].subCategoryName
      this.goal.total = costTransReduce[index].value
      costTransReduce = this.transactionsService.customReduce(dataList, 'Расходы', 'Факт');
      index = costTransReduce.findIndex((item) => item.categoryName === 'Цели')
      this.goal.value = costTransReduce[index].value

    });
  }


}
