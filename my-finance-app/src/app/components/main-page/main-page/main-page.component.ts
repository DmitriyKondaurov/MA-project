import {Component, OnInit} from '@angular/core';
import {IFrontPageItem, ITransactArchive} from 'src/app/app-interfaces';
import {TransactionsService} from "../../../services/transactions.service";
import {RestApiService} from "../../../services/res-api.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  transactionsList : any[] = [];
  currDate: Date = new Date();

  income: IFrontPageItem = {
    name:'Income',
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
    name:'Costs',
    value: 0,
    total: 0,
    progress: ''
  };

  constructor(private transactionsService: TransactionsService, private readonly restService: RestApiService) { }

  ngOnInit() {
    this.restService.getTransactions().snapshotChanges().subscribe( res => {
      this.transactionsList = [];
      res.forEach( item => {
        this.transactionsList.push(item.payload.toJSON());
      } )

// INCOME
      this.getTransactions(this.transactionsList, 'income', this.income);

// COST
      this.getTransactions(this.transactionsList, 'costs', this.cost);

// GOALS
      this.getGoals()

    });
  }

  getTransactions(transactionsList: ITransactArchive[], flowDirection: string, variable: IFrontPageItem) {
    variable.value = 0;
    variable.total = 0;
    variable.progress = '0';
    let transactionsReduce = this.transactionsService.customReduce(transactionsList, flowDirection, 'actual', this.currDate);
    variable.value = transactionsReduce.reduce((acc, curr) => acc += curr.amount, 0)
    transactionsReduce = this.transactionsService.customReduce(transactionsList, flowDirection, 'planned', this.currDate);
    variable.total = transactionsReduce.reduce((acc, curr) => acc += curr.amount, 0)
    variable.progress = Math.round(variable.value/variable.total*100).toString()+'%'
  }

  getGoals() {
    const goalTransReducePlan = this.transactionsService.customReduce(this.transactionsList, 'costs', 'planned');
    let index = goalTransReducePlan.findIndex((item) => item.categoryName === 'Goals')

    if (index >= 0 ) {
      this.goal.name = goalTransReducePlan[index].subCategoryName
      this.goal.total = goalTransReducePlan[index].amount
    } else {
      this.goal.name = ''
      this.goal.total = 0
    }

    const goalTransReduceActual = this.transactionsService.customReduce(this.transactionsList, 'costs', 'actual');

    index = goalTransReduceActual.findIndex((item) => item.categoryName === 'Goals')
    if (index >= 0 ) {
      this.goal.value = goalTransReduceActual[index].amount
    } else {
      this.goal.value = 0
    }
    this.goal.total ? this.goal.progress = Math.round(this.goal.value/this.goal.total*100).toString()+'%' : 0
  }


}
