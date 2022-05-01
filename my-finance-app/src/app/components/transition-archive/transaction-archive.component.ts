import { Component, OnInit } from '@angular/core';
import { MonitoringInfoService } from '../../services/monitoring-info.service'

@Component({
  selector: 'app-transaction-archive',
  templateUrl: './transaction-archive.component.html',
  styleUrls: ['./transaction-archive.component.css']
})
export class TransactionArchiveComponent implements OnInit {

  transitions: object[] = [];

  constructor(private MonitoringInfoService: MonitoringInfoService) { }

  ngOnInit(): void {
    this.transitions = this.MonitoringInfoService.monitoringInfo();
  }

}
