import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/res-api.service'
import { CostInfoService } from 'src/app/services/cost-info.service';
import { Categories, Transaction } from 'src/app/app-interfaces';

@Component({
  selector: 'app-cost-monitoring',
  templateUrl: './cost-monitoring.component.html',
  styleUrls: ['./cost-monitoring.component.css']
})
export class CostMonitoringComponent implements OnInit {

  data: any[] = [];
  costs: Transaction[] = []
  arrCategories: any[] = [];
  costCategories: any[] = [];
  notZeroCategories: object[] = [];

  constructor(private RestApiService: RestApiService, private CostInfoService: CostInfoService) { }

  ngOnInit(): void {
    this.RestApiService.getCategories().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.arrCategories.push(item.payload.toJSON());
      })
      let categories: Categories[] = Object.values(this.arrCategories[0])
      categories.forEach( (item: Categories)  => {
        this.costCategories.push(Object.values(item.subCategories))
      })
      this.costCategories = this.costCategories.flat();
    })
    this.RestApiService.getTransactions().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.data.push(item.payload.toJSON());
      } )
      this.calculateCosts(this.CostInfoService.costInfo(this.data));
    })
    
  }

  calculateCosts(data: Transaction[]) {
    let object: any = {};
    let allCosts: any = [];
      data.forEach((element: Transaction) => {
        allCosts.push({[element.category]: +element.amount * element.currency.value})
      });


      this.costCategories.forEach( (category: string) => {
        object[category] = 0;
        allCosts.forEach( (el: any) => {
          if(Object.keys(el).includes(category)) {
          object[category] = object[category] + el[category]
          }
        })
      })
      let arr = Object.entries(object);
      arr.forEach( (category) => {
        if((category)[1] != 0) this.notZeroCategories.push({[category[0]]: category[1]});
      })
      return this.notZeroCategories;
  }

}
