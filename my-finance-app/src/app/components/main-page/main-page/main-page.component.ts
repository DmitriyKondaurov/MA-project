import {Component, Input, OnInit} from '@angular/core';
import {IFrontPageItem, ITransactArchive} from 'src/app/app-interfaces';
import {Observable, Subscription} from "rxjs";
import {TransactionsService} from "../../../services/transactions.service";
import {RestApiService} from "../../../services/res-api.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  transactionList : ITransactArchive[] = []
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
    this.restService.getAllTransactions().subscribe((dataList: ITransactArchive[]) => {
      this.transactionList = dataList

// INCOME
      this.getTransactions('Доходы', this.income);

// COST
      this.getTransactions('Расходы', this.cost);

// GOALS
      this.getGoals()

    });
  }

  getTransactions(flowDirection: string, variable: IFrontPageItem) {
    let incomeTransReduce = this.transactionsService.customReduce(this.transactionList, flowDirection, 'Факт', this.currDate);
    variable.value = incomeTransReduce.reduce((acc, curr) => acc += curr.value, 0)
    incomeTransReduce = this.transactionsService.customReduce(this.transactionList, flowDirection, 'План', this.currDate);
    variable.total = incomeTransReduce.reduce((acc, curr) => acc += curr.value, 0)
  }

  getGoals() {
    let goalTransReduce = this.transactionsService.customReduce(this.transactionList, 'Расходы', 'План');
    let index = goalTransReduce.findIndex((item) => item.categoryName === 'Цели')
    if (index >= 0 ) {
      this.goal.name = goalTransReduce[index].subCategoryName
      this.goal.total = goalTransReduce[index].value
    } else {
      this.goal.name = ''
      this.goal.total = 0
    }
    goalTransReduce = this.transactionsService.customReduce(this.transactionList, 'Расходы', 'Факт');
    index = goalTransReduce.findIndex((item) => item.categoryName === 'Цели')
    if (index >= 0 ) {
      this.goal.value = goalTransReduce[index].value
    } else {
      this.goal.value = 0
    }
  }


}
