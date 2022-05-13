import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MonitoringInfoService } from '../../services/monitoring-info.service'
import { RestApiService } from '../../services/res-api.service'
import { Transaction } from 'src/app/app-interfaces';

@Component({
  selector: 'app-transaction-archive',
  templateUrl: './transaction-archive.component.html',
  styleUrls: ['./transaction-archive.component.css']
})
export class TransactionArchiveComponent implements OnInit {

  data: Transaction[] = []
  transactions: Transaction[] = [];

  constructor(private RestApiService: RestApiService, private MonitoringInfoService: MonitoringInfoService) { }

  sayHello(id: any) {
    // this.RestApiService.deleteTransaction(id);
    this.getTransaction();
  }

  getTransaction() {
    this.RestApiService.getTransactions().snapshotChanges().subscribe( res => {
      this.data = [];
      res.forEach( item => {
        let a: Transaction | any;
        a =  item.payload.toJSON();
        a['$key'] = item.key;
        this.data.push(a as Transaction);
      } )
      console.log(this.data);
      this.transactions = this.MonitoringInfoService.monitoringInfo(this.data);
    })
  }

  ngOnInit() {
    this.getTransaction();
  }
}
