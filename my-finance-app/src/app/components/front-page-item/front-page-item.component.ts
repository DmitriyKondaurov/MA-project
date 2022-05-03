import { Component, OnInit, Input } from '@angular/core';
import {IFrontPageItem} from "../../app-interfaces";
import {TakeColorService} from "../../services/take-color.service";

@Component({
  selector: 'app-front-page-item',
  templateUrl: './front-page-item.component.html',
  styleUrls: ['./front-page-item.component.css']
})
export class FrontPageItemComponent implements OnInit {

  @Input()  frontPageItem: IFrontPageItem = {
    name: '',
    value: 0,
    total: 0,
  };

  color: string = '';
  width: string = '';


 constructor(private choseHighlightColor: TakeColorService) { }

  ngOnInit(): void {
    this.color = this.choseHighlightColor.takeNewColor()

  }
  ngOnChanges() {
    let fillAmountValue = 0
    fillAmountValue = Math.round((Number(this.frontPageItem.value)/Number(this.frontPageItem.total))*100)
    this.width = `${fillAmountValue}%`
    console.log(this.frontPageItem)
  }

}
