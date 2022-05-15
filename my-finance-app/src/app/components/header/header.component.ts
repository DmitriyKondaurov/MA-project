import { Component, OnInit } from '@angular/core';
import {TakeColorService} from "../../services/take-color.service";
import {RestApiService} from "../../services/res-api.service";
import {IBalance, ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";
import { AuthService } from 'src/app/services/auth.service';
import {AngularFireObject, SnapshotAction} from "@angular/fire/compat/database";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  transactions: ITransactArchive[] = [];
  data: any[] = []
  curBalance: IBalance = {
    amount: 0,
    currency: 'UAH',
    dateString: new Date().toDateString(),
  };
  color: string = '';
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
            amount: NaN,
            dateString: '',
            currency: ''
          }
          balance = resBalance.payload.toJSON()
          this.curBalance = balance;
        this.data = [];
          resTransactions.forEach( item => {
          this.data.push(item.payload.toJSON());
        } )
        const income = this.getTotalFilteringTransactions(this.data, 'income', this.curBalance)
        const costs = this.getTotalFilteringTransactions(this.data, 'costs', this.curBalance)
        this.curBalance.amount = this.curBalance.amount + income - costs;
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

}
