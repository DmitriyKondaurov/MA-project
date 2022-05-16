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
  goalTillDate: string | Date = '';

  goal: ITransactArchive = {
    amount: NaN,
    categoryName: "Goals",
    currency: {value: 1, title: 'UAH'},
    date: "",
    description: "",
    expense: {value: 'planned', title: 'planned'},
    subCategoryName: "",
    type:  {value: 'costs', title: 'consumption', id: 0},
  }

  constructor(private RestApiService: RestApiService) { }

  submitForm(): void {
      this.RestApiService.setGoal(this.goal);
  }

  ngOnInit(): void {
    this.RestApiService.getGoal().snapshotChanges().subscribe( (res: any[]) => {
      let buffer: any[] = [];
      let index: number = NaN;
      res.forEach( item => {
        buffer.push(item.payload.toJSON());
      })
      buffer = buffer.filter((i) => i.categoryName === 'Goals');
      index = buffer.findIndex((item: any) => {
        return  item.expense.value === 'planned'
      })
      if (index >= 0) {
        this.goal = buffer[index];
        this.goalName = this.goal.subCategoryName;
        this.goalDescription = this.goal.description;
        this.goalPrice = this.goal.amount;
        this.goalCurrency = this.goal.currency.title;
        this.goalTillDate = this.goal.date;
      }
    })
  }
}
