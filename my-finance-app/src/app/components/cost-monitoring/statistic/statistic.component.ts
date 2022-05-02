import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/res-api.service'

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  data: string[] = [];

  constructor(private RestApiService: RestApiService) { }

  ngOnInit(): void {
    this.RestApiService.getTest().subscribe(res => {
      this.data = res;
      // this.transitions = this.MonitoringInfoService.monitoringInfo(this.data);
    })
  }

}
