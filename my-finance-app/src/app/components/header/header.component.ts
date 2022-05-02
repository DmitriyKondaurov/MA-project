import { Component, OnInit } from '@angular/core';
import {TakeColorService} from "../../services/take-color.service";
import {RestApiService} from "../../services/res-api.service";
import {Subscription} from "rxjs";
import {IBalance, ITransactArchive} from "../../app-interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  balance: number = 0;
  color: string = '';
  subscriptionGetData: Subscription | undefined;
  constructor(private choseHighlightColor: TakeColorService, private readonly restApiService: RestApiService) { }


  ngOnInit() {
    this.color = this.choseHighlightColor.takeNewColor();
    // return this.subscriptionGetData = this.restApiService.getBalance().subscribe((dataList: IBalance) => {

      // let data: number = dataList;
      // this.balance = 0;
    // });
  }


}
