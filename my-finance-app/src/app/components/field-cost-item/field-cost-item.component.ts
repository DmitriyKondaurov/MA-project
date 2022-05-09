import {Component, Input, OnInit} from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";
import {TakeColorService} from "../../services/take-color.service";

@Component({
  selector: 'app-field-cost-item',
  templateUrl: './field-cost-item.component.html',
  styleUrls: ['./field-cost-item.component.css']
})
export class FieldCostItemComponent implements OnInit {
  @Input() totalCostAmount: number = 0;
  @Input() costByCategory: ITransactArchive = {
    amount: 0,
    categoryName: "",
    currency: {
      title: "",
      value: 0
    },
    date: "",
    description: "",
    expense:{
      title: "",
      value: ""
    },
    subCategoryName: "",
    type: {
      id: 0,
      title: "",
      value: ""
    },
    userId: 0
}

  color: string = '';

  constructor(private choseHighlightColor: TakeColorService) { }

  ngOnInit(): void {
    this.color = this.choseHighlightColor.takeNewColor()
  }

}
