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

  data: any[] = []
  transitions: Transaction[] = [];

  constructor(private RestApiService: RestApiService, private MonitoringInfoService: MonitoringInfoService) { }

  ngOnInit() {
    this.RestApiService.getTransactions().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.data.push(item.payload.toJSON());
      } )
      this.transitions = this.MonitoringInfoService.monitoringInfo(this.data);
    })
  }
}
