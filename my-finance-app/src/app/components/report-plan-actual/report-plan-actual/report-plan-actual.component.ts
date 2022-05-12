import { Component, OnInit } from '@angular/core';
import months from "./months";
import {RestApiService} from "../../../services/res-api.service";
import {TransactionsService} from "../../../services/transactions.service";
import {IMonth, ITransactArchive} from "../../../app-interfaces";

@Component({
  selector: 'app-report-plan-actual',
  templateUrl: './report-plan-actual.component.html',
  styleUrls: ['./report-plan-actual.component.css']
})
export class ReportPlanActualComponent implements OnInit {
  selectedFlowDirection: "costs" | "income" | '' = '';
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  flowDirection = ['', 'costs', 'income'];
  monthsForSelect = [...months];
  monthsForTable = [...months];
  years = [new Date().getFullYear()]; // it must be taken from transactions
  transactions: ITransactArchive[] = [];
  data: any[] = [];
  plannedIncomeTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  plannedCostsTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  actualIncomeTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  actualCostsTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);

    constructor( private readonly restApiService: RestApiService,
                 private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.monthsForTable.shift();
    this.restApiService.getTransactions().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.data.push(item.payload.toJSON());
      } )
      const date = new Date(this.selectedYear, this.selectedMonth, 1);
      const transactionsByYear = this.transactionsService.filterByYear(this.data, this.selectedYear);
      transactionsByYear.sort((a, b) => a.amount - b.amount);
      const plannedTransactions = this.transactionsService.filterByPlanActual(transactionsByYear, 'planned');
      const actualTransactions = this.transactionsService.filterByPlanActual(transactionsByYear, 'actual');
      const plannedIncomeTrans = this.transactionsService.filterByFlow(plannedTransactions, 'income');
      const plannedCostsTrans = this.transactionsService.filterByFlow(plannedTransactions, 'costs');
      const actualIncomeTrans = this.transactionsService.filterByFlow(actualTransactions, 'income');
      const actualCostsTrans = this.transactionsService.filterByFlow(actualTransactions, 'costs');
      this.plannedIncomeTransByMonths = this.transactionsService.customReduceByMonth(plannedIncomeTrans);
      this.plannedCostsTransByMonths = this.transactionsService.customReduceByMonth(plannedCostsTrans);
      this.actualIncomeTransByMonths = this.transactionsService.customReduceByMonth(actualIncomeTrans);
      this.actualCostsTransByMonths = this.transactionsService.customReduceByMonth(actualCostsTrans);

    })
  }


      // transReduceByCategories.reduce((acc, curr) => acc += curr.amount, 0)



}
