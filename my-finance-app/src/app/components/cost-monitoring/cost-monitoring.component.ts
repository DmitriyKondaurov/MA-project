import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/res-api.service'
import { CostInfoService } from 'src/app/services/cost-info.service';

@Component({
  selector: 'app-cost-monitoring',
  templateUrl: './cost-monitoring.component.html',
  styleUrls: ['./cost-monitoring.component.css']
})
export class CostMonitoringComponent implements OnInit {

  data: string[] = [];
  costs: object[] = []
  arrCategories: object[] = [];
  notZeroCategories: object[] = [];

  constructor(private RestApiService: RestApiService, private CostInfoService: CostInfoService) { }

  ngOnInit(): void {
  //   this.RestApiService.getTest().subscribe(res => {
  //     this.data = res;
  //     this.costs = this.CostInfoService.costInfo(this.data);
  //     this.calculateCosts(this.costs);
  //   })
  // }

  // calculateCosts(data: object[]) {
  //   let categories;
  //   let object: any = {};
  //   this.RestApiService.getData().subscribe( res => {
  //     categories = res.cost;
  //     let costValue = Object.values(res)[1]
  //     let costsCategories: string[] = [];
  //     costValue.forEach((element: object) => {
  //       costsCategories.push(Object.values(element)[1])
  //     });
  //     costsCategories = costsCategories.flat()

  //     costsCategories.forEach((key)=>{
  //       object[key]=0
  //     }); 

  //     costsCategories.forEach( category => {
  //       data.forEach( (el) => {
  //         if(Object.values(el).includes(category)) {
  //         let amount =  Object.values(el)[5];
  //         object[category] = object[category] + + amount
  //         }
  //       })
  //     })

  //     for (const [key, value] of Object.entries(object)) {
  //       this.arrCategories.push({ [key]: value });
  //     }
  //     this.arrCategories.forEach( (category: object) => {
  //       if(Object.values(category)[0] != '0') this.notZeroCategories.push(category);
  //     })
  //     return this.notZeroCategories;
  //   })
  }

}
