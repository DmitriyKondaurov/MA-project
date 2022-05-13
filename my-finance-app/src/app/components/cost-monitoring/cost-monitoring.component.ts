import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestApiService } from '../../services/res-api.service'
import { CostInfoService } from 'src/app/services/cost-info.service';
import { Categories, Transaction } from 'src/app/app-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cost-monitoring',
  templateUrl: './cost-monitoring.component.html',
  styleUrls: ['./cost-monitoring.component.css']
})
export class CostMonitoringComponent implements OnInit, OnDestroy {

  subscription1$?: Subscription;
  subscription2$?: Subscription ;

  data: any[] = [];
  costs: Transaction[] = []
  arrCategories: any[] = [];
  costCategories: any[] = [];
  notZeroCategories: object[] = [];
  diagramCategories: object[] = [];
  amount = 0;

  constructor(private RestApiService: RestApiService, private CostInfoService: CostInfoService) { }
  ngOnDestroy(): void {
    this.subscription1$!.unsubscribe()
    this.subscription2$!.unsubscribe()
  }

  ngOnInit(): void {
    // this.data.length = 0;
    // this.costs.length = 0;
    // this.arrCategories.length = 0;
    // this.costCategories.length = 0;
    // this.notZeroCategories.length = 0;
    // this.diagramCategories.length = 0;
    // this.amount = 0;
    this.subscription1$ = this.RestApiService.getCategories().snapshotChanges().subscribe( res => {
      res.forEach( item => {
        this.arrCategories.push(item.payload.toJSON());
      })
      let categories: Categories[] = Object.values(this.arrCategories[0])
      categories.forEach( (item: Categories)  => {
        this.costCategories.push(Object.values(item.subCategories))
      })
      this.costCategories = this.costCategories.flat();
      this.subscription2$ = this.RestApiService.getTransactions().snapshotChanges().subscribe( res => {
        res.forEach( item => {
          this.data.push(item.payload.toJSON());
        })
        this.notZeroCategories = this.calculateCosts(this.CostInfoService.costInfo(this.data));
      })
    })
  }

  calculateCosts(data: Transaction[]) {
    let object: any = {};
    let allCosts: any = [];
    data.forEach((element: Transaction) => {
      allCosts.push({[element.subCategoryName]: +element.amount * element.currency.value})
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
    this.diagramInfo(this.notZeroCategories);
    return this.diagramCategories;
  }

  diagramInfo(data: any) {
    data.forEach((element: any) => {
      let elAmount: any = Object.values(element)[0]
      this.amount = this.amount + elAmount;
    });
    data.forEach((element: any) => {
      let percentPart = 0;
      let elAmount: any = Object.values(element)[0]
      percentPart = elAmount/this.amount*100;
      element.percentPart = +percentPart.toFixed(2);
      element.color = '#'+(Math.random().toString(16)+'00000').slice(2,8);
      this.diagramCategories.push(element);
    });
  }
}
