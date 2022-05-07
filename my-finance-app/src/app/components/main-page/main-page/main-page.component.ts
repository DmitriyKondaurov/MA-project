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
  transactionList : any[] = []
  currDate: Date = new Date();

  income: IFrontPageItem = {
    name:'Надходження',
    value: 0,
    total: 0,
    progress: ''
  };

  goal: IFrontPageItem = {
    name:'',
    value: 0,
    total: 0,
    progress: ''
  };

  cost: IFrontPageItem = {
    name:'Витрати',
    value: 0,
    total: 0,
    progress: ''
  };

  constructor(private transactionsService: TransactionsService, private readonly restService: RestApiService) { }

  ngOnInit() {
    this.restService.getTransactions().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.transactionList.push(item.payload.toJSON());
      } )

// INCOME
      this.getTransactions(this.transactionList, 'Доходы', this.income);

// COST
      this.getTransactions(this.transactionList, 'Расходы', this.cost);

// GOALS
      this.getGoals()

    });
  }

  getTransactions(transactionsList: ITransactArchive[], flowDirection: string, variable: IFrontPageItem) {
    let transactionsReduce = this.transactionsService.customReduce(transactionsList, flowDirection, 'Факт', this.currDate);
    variable.value = transactionsReduce.reduce((acc, curr) => acc += curr.amount, 0)
    transactionsReduce = this.transactionsService.customReduce(transactionsList, flowDirection, 'План', this.currDate);
    variable.total = transactionsReduce.reduce((acc, curr) => acc += curr.amount, 0)
    variable.progress = Math.round(variable.value/variable.total*100).toString()+'%'
  }

  getGoals() {
    let goalTransReduce = this.transactionsService.customReduce(this.transactionList, 'Расходы', 'План');
    let index = goalTransReduce.findIndex((item) => item.categoryName === 'Цели')
    if (index >= 0 ) {
      this.goal.name = goalTransReduce[index].subCategoryName
      this.goal.total = goalTransReduce[index].amount
    } else {
      this.goal.name = ''
      this.goal.total = 0
    }
    goalTransReduce = this.transactionsService.customReduce(this.transactionList, 'Расходы', 'Факт');
    index = goalTransReduce.findIndex((item) => item.categoryName === 'Цели')
    if (index >= 0 ) {
      this.goal.value = goalTransReduce[index].amount
    } else {
      this.goal.value = 0
    }
    this.goal.total ? this.goal.progress = Math.round(this.goal.value/this.goal.total*100).toString()+'%' : 0
  }


}
