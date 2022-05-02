import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MonitoringInfoService } from '../../services/monitoring-info.service'
import { RestApiService } from '../../services/res-api.service'

@Component({
  selector: 'app-transaction-archive',
  templateUrl: './transaction-archive.component.html',
  styleUrls: ['./transaction-archive.component.css']
})
export class TransactionArchiveComponent implements OnInit {

  data: string[] = []
  transitions: object[] = [];

  constructor(private RestApiService: RestApiService, private MonitoringInfoService: MonitoringInfoService) { }

  ngOnInit() {
    this.RestApiService.getTest().subscribe(res => {
      this.data = res;
      this.transitions = this.MonitoringInfoService.monitoringInfo(this.data);
    })
    
  }

}
