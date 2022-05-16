import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../../services/res-api.service";
import {ITransactArchive} from "../../app-interfaces";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {
  goalName: string = '';
  goalCurrency: string = 'UAH';
  goalDescription: string = '';
  goalPrice: number = NaN;
  goalTillDate: string = '';
  data?: any;

  goal: ITransactArchive = {
    amount: 0,
    categoryName: "goals",
    currency: {value: 1, title: 'UAH'},
    date: "",
    description: "",
    expense: {value: 'planned', title: 'planned'},
    subCategoryName: "",
    type:  {value: 'costs', title: 'consumption', id: 0},
  }

  subCategories: any;

  constructor(private RestApiService: RestApiService) { }

  submitForm(): void {
      this.RestApiService.addTransaction(this.goal);
  }

  ngOnInit(): void {
  }

}
