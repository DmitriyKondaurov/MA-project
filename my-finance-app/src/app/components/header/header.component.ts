import { Component, OnInit } from '@angular/core';
import {TakeColorService} from "../../services/take-color.service";
import {RestApiService} from "../../services/res-api.service";
import {Subscription} from "rxjs";
import {IBalance, IFrontPageItem, ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  transactions: ITransactArchive[] = [];
  curBalance: IBalance = {
    amount: 0,
    currency: 'грн',
    dateString: '',
  };
  color: string = '';
  currDate: Date = new Date();
  constructor(private choseHighlightColor: TakeColorService,
              private readonly restApiService: RestApiService,
              private transactionsService: TransactionsService
  ) { }


  ngOnInit() {
    this.color = this.choseHighlightColor.takeNewColor();

      this.restApiService.getBalance().subscribe((balance: IBalance) => {
        this.curBalance = balance;
        this.restApiService.getAllTransactions().subscribe((dataList: ITransactArchive[]) => {
          this.transactions = dataList;
          const income = this.getTotalFilteringTransactions(this.transactions, 'Доходы', this.curBalance)
          const cost = this.getTotalFilteringTransactions(this.transactions, 'Расходы', this.curBalance)
          this.curBalance.amount = this.curBalance.amount + income - cost;
          console.log(income, cost, this.curBalance)
        });
    });

  }

  getTotalFilteringTransactions(transactionList:ITransactArchive[], flowDirection: string, balance: IBalance) {
    let transactionsReduce = this.transactionsService.customReduce(transactionList, flowDirection, 'Факт');
    return transactionsReduce.reduce((acc, curr) => {
      const itemDate = new Date(curr.date)
      const balanceDate = new Date(balance.dateString)
      if (itemDate >= balanceDate && itemDate <= this.currDate) {
        return acc += curr.value
      } else return acc
    }, 0)
  }

}
