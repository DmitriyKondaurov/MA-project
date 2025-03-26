import { Component, OnInit } from '@angular/core';
import months from "./months";
import {RestApiService} from "../../../services/res-api.service";
import {TransactionsService} from "../../../services/transactions.service";
import {IMonth, ITotalByCategory, ITransactArchive} from "../../../app-interfaces";

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
  data: any[] = [];
  transactionsByYear: ITransactArchive[] = [];
  plannedIncomeTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  plannedCostsTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  actualIncomeTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  actualCostsTransByMonths: IMonth[] = Array(12).fill({title:'', value: 0, total: 0},);
  plannedIncomeTransByCategory: ITotalByCategory[] = [];
  plannedCostsTransByCategory: ITotalByCategory[] = [];
  actualIncomeTransByCategory: ITotalByCategory[] = [];
  actualCostsTransByCategory: ITotalByCategory[] = [];
  allNotEmptyCategories: ITotalByCategory[] = []

  constructor( private readonly restApiService: RestApiService,
                 private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.monthsForTable.shift();
    this.restApiService.getTransactions().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.data.push(item.payload.toJSON());
      } )

      this.years = this.data.reduce((acc, cur) => {
          if (!acc.includes(Number(cur.date.substring(0, 4)))) {
            acc.push(Number(cur.date.substring(0, 4)));
          }
          return acc;
      }, <ITotalByCategory[]>[])

      this.selectedYear = this.years[this.years.length - 1];
      // this.selectedYear = 2022;
      this.transactionsByYear = this.transactionsService.filterByYear(this.data, this.selectedYear);
      this.transactionsByYear.sort((a, b) => a.amount - b.amount);
      this.plannedIncomeTransByMonths = this.setDataByMonth(this.transactionsByYear, 'planned', 'income')
      this.plannedCostsTransByMonths = this.setDataByMonth(this.transactionsByYear, 'planned', 'costs')
      this.actualIncomeTransByMonths = this.setDataByMonth(this.transactionsByYear, 'actual', 'income')
      this.actualCostsTransByMonths = this.setDataByMonth(this.transactionsByYear, 'actual', 'costs')

      if (this.selectedMonth) {
        this.setDataByCategory(this.selectedMonth, this.selectedFlowDirection)
      }
    })
  }

  setDataByCategory(selectedMonth: number, selectedFlow: string) {
    this.allNotEmptyCategories = this.transactionsService.filterByMonth(this.transactionsByYear, +this.selectedMonth)
      .reduce((acc, curr) => {
        const index: number = acc.findIndex((i) => i.categoryName === curr.categoryName)
      if (index >= 0) {
        return acc
      } else {
        const missCategory: ITotalByCategory = {
          categoryName: curr.categoryName,
          value: 0,
          flow: curr.type.value
        }
        acc.push(missCategory);
        return acc;
      }
    }, <ITotalByCategory[]>[])

    this.plannedIncomeTransByCategory = this.getDataByCategory(this.transactionsByYear,'planned', 'income', +selectedMonth)
    this.plannedCostsTransByCategory = this.getDataByCategory(this.transactionsByYear,'planned', 'costs', +selectedMonth)
    this.actualIncomeTransByCategory = this.getDataByCategory(this.transactionsByYear,'actual', 'income', +selectedMonth)
    this.actualCostsTransByCategory = this.getDataByCategory(this.transactionsByYear,'actual', 'costs', +selectedMonth)
  }

  getDataByCategory(transactions:ITransactArchive[], planActual: 'planned'|'actual', flow:'income'|'costs'|'', month:number) {

    const planActTransactions = this.transactionsService.filterByPlanActual(transactions, planActual);
    const transactionByFlow = this.transactionsService.filterByFlow(planActTransactions, flow);
    const transactionByMonth = this.transactionsService.filterByMonth(transactionByFlow, month)
    const transactionByCategories = this.transactionsService.reduceByCategory(transactionByMonth);
    let shallowCopyCategories = [... this.allNotEmptyCategories];

    transactionByCategories.reduce((acc, curr)=>{
      const index = shallowCopyCategories.findIndex((i)=> i.categoryName === curr.categoryName)
      if (index >= 0) {
        shallowCopyCategories[index] = curr;
        return acc;
      } else {
        return acc;
      }
    }, <ITotalByCategory[]>[])
    return shallowCopyCategories

  }

  setDataByMonth(transactions:ITransactArchive[], planActual: 'planned'|'actual', flow:'income'|'costs'|'') {
    const planActTransactions = this.transactionsService.filterByPlanActual(transactions, planActual);
    const transactionByFlow = this.transactionsService.filterByFlow(planActTransactions, flow);
    return this.transactionsService.customReduceByMonth(transactionByFlow);
  }

  setDataByYear(year:number) {
    this.transactionsByYear = this.transactionsService.filterByYear(this.data, Number(year));
    this.transactionsByYear.sort((a, b) => a.amount - b.amount);
    this.plannedIncomeTransByMonths = this.setDataByMonth(this.transactionsByYear, 'planned', 'income')
    this.plannedCostsTransByMonths = this.setDataByMonth(this.transactionsByYear, 'planned', 'costs')
    this.actualIncomeTransByMonths = this.setDataByMonth(this.transactionsByYear, 'actual', 'income')
    this.actualCostsTransByMonths = this.setDataByMonth(this.transactionsByYear, 'actual', 'costs')
  }
}
