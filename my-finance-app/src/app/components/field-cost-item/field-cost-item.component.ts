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
    id: 0,
    userId: 0,
    date: new Date(0,0,0),
    flowDirection: "",
    planFact: "",
    categoryName: "",
    subCategoryName: "",
    value: 0,
    currency: "",
    description: ""
}

  color: string = '';

  constructor(private choseHighlightColor: TakeColorService) { }

  ngOnInit(): void {
    this.color = this.choseHighlightColor.takeNewColor()
    console.log('costByCategory', this.costByCategory)
  }

}
