import { Component, OnInit } from '@angular/core';
import {TakeColorService} from "../../services/take-color.service";
import {RestApiService} from "../../services/res-api.service";
import {IBalance, ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedBalanceAmount: number = NaN;
  selectedBalanceDate: string = '';
  selectedBalanceCurr: string = 'UAH';
  transactions: ITransactArchive[] = [];
  data: any[] = [];
  startBalance: IBalance = {
    amount: NaN,
    currency: '',
    dateString: '',
  };
  curBalance: IBalance = {
    amount: 0,
    currency: 'UAH',
    dateString: new Date().toDateString(),
  };
  color: string = '';
  showModalBalance = false;
  currDate: Date = new Date();
  constructor(private choseHighlightColor: TakeColorService,
              private readonly restApiService: RestApiService,
              private transactionsService: TransactionsService,
              public auth: AuthService
  ) { }


  ngOnInit() {
    this.color = this.choseHighlightColor.takeNewColor();

      this.restApiService.getTransactions().snapshotChanges().subscribe( resTransactions => {
        this.restApiService.getBalance().snapshotChanges().subscribe( (resBalance: any) => {
          let balance = {
            amount: 0,
            dateString: '',
            currency: ''
          }
          resBalance.payload.toJSON() ? balance = resBalance.payload.toJSON(): balance;
          this.startBalance = balance;
          this.selectedBalanceDate = balance.dateString;
          this.selectedBalanceAmount = balance.amount;

          this.data = [];
            resTransactions.forEach( item => {
            this.data.push(item.payload.toJSON());
          } )
          const income = this.getTotalFilteringTransactions(this.data, 'income', this.startBalance)
          const costs = this.getTotalFilteringTransactions(this.data, 'costs', this.startBalance)
          this.curBalance.amount = this.startBalance.amount + income - costs;
          // console.log(income, costs)
      })
    })
  }

  getTotalFilteringTransactions(transactionList:ITransactArchive[], flowDirection: string, balance: IBalance) {
    let transactionsReduce = this.transactionsService.customReduce(transactionList, flowDirection, 'actual');
    return transactionsReduce.reduce((acc, curr) => {
      const itemDate = new Date(curr.date)
      const balanceDate = new Date(balance.dateString)
      if (itemDate >= balanceDate && itemDate <= this.currDate) {
        return acc += curr.amount
      } else return acc
    }, 0)
  }

  setBalance() {
    this.startBalance.amount = this.selectedBalanceAmount;
    this.startBalance.dateString = this.selectedBalanceDate;
    this.startBalance.currency = this.selectedBalanceCurr;
    this.restApiService.setBalance(this.startBalance)
    this.showModalBalance = false;
  }

}
