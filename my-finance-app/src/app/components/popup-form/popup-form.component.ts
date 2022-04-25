import { GetDataService } from './../../services/get-data.service';
import { Categories, Cost, Income } from './../../categories';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Type {
  value: 'cost' | 'income',
  title: string
}
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})

export class PopupFormComponent implements OnInit {

  data?: Categories;
  dataStorage?: string[] = [];


  types: Type[] = [
    {value: 'cost', title: 'consumption'},
    {value: 'income', title: 'income'},
  ];

  expenses = [
    {value: 'planned', title: 'planned'},
    {value: 'actual', title: 'actual'},
  ];

  categories: string[] | undefined;

  currencies = [
    {value: 29, title: 'Dollar'},
    {value: 30, title: 'Euro'},
    {value: 1, title: 'Hryvnia'},
  ]

  form = new FormGroup({
    type: new FormControl("", Validators.required),
    expense: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    description: new FormControl(),
    amount: new FormControl("", [Validators.required,
                                Validators.pattern("^[0-9]*$")]),
    currency: new FormControl("", Validators.required),
  });


  @Output() handleHide = new EventEmitter();
 

  constructor(private GetDataService: GetDataService) { }

  handleHideClick(): void {
    this.handleHide.emit();
  }


  ngOnInit(): void {
    this.GetDataService.getData().subscribe( res => {
      this.data = res;
    } )

    const dateControl = document.querySelector('[data-date-input]') as HTMLInputElement ;
    this.form.controls['expense'].valueChanges.subscribe( ({ value }) => {
      if (value === 'planned') dateControl.type = 'month'
      else dateControl.type = 'date';
    })
    this.form.controls['type'].valueChanges.subscribe( ({ value }: Type) => {
      if(!this.data) return;
      console.log(this.data, value);
      let obj = this.data[value];
      this.categories = Object.values(this.data[value]).flat();
    } )
  }

  submitForm(): void {
    if(this.form.valid) {
      this.dataStorage?.push(JSON.stringify(this.form.value));
      localStorage.setItem("dataForm", JSON.stringify(this.dataStorage));
    }
  }

}
