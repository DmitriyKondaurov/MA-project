import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/res-api.service'
import { CostInfoService } from 'src/app/services/cost-info.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  data: string[] = [];
  costs: object[] = []

  constructor(private RestApiService: RestApiService, private CostInfoService: CostInfoService) { }

  ngOnInit(): void {
    this.RestApiService.getTest().subscribe(res => {
      this.data = res;
      this.costs = this.CostInfoService.costInfo(this.data);
      console.log(this.costs)
    })
  }

}
