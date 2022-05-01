import { GetDataService } from './../../services/get-data.service';
import { RestApiService } from './../../services/res-api.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategories } from 'src/app/app-interfaces';

interface Type {
  value: 'cost' | 'income',
  title: string,
}
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})

export class PopupFormComponent implements OnInit {

  data?: ICategories;
  dataStorage?: string[] = [];


  types: Type[] = [
    {value: 'cost', title: 'consumption'},
    {value: 'income', title: 'income'},
  ];

  expenses = [
    {value: 'planned', title: 'planned'},
    {value: 'actual', title: 'actual'},
  ];

  categories: any;

  currencies = [
    {value: 29, title: 'Dollar'},
    {value: 30, title: 'Euro'},
    {value: 1, title: 'Hryvnia'},
  ]

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    expense: new FormControl(this.expenses[1], Validators.required),
    date: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    description: new FormControl(),
    amount: new FormControl(0, [Validators.required,
                                Validators.pattern("^[0-9]*$")]),
    currency: new FormControl(this.currencies[2], Validators.required),
  });


  @Output() handleHide = new EventEmitter();
 

  constructor(private GetDataService: GetDataService, private RestApiService: RestApiService) { }

  handleHideClick(): void {
    this.handleHide.emit();
  }


  ngOnInit(): void {
    this.RestApiService.getData().subscribe( res => {
      this.data = res;
    } )

    const dateControl = document.querySelector('[data-date-input]') as HTMLInputElement ;
    this.form.controls['expense'].valueChanges.subscribe( ({ value }) => {
      if (value === 'planned') dateControl.type = 'month'
      else dateControl.type = 'date';
    })
    this.form.controls['type'].valueChanges.subscribe( ({ value }: Type) => {
      if(!this.data) return;
      this.categories = Object.values(this.getValues(this.data[value]));
    } )
  }

  submitForm(): void {
    if(this.form.valid) {
      if(localStorage.length === 0) this.save()
      else {
        this.dataStorage = JSON.parse(localStorage.getItem('dataForm')!)
        this.save()
      }
      console.log('ok');
      this.RestApiService.sendTest({storage: this.dataStorage}).subscribe()
    }
  }

  save() {
    this.dataStorage?.push(JSON.stringify(this.form.value))
    localStorage.setItem("dataForm", JSON.stringify(this.dataStorage));
  }

  getValues(data: any): any {
    let arr: string[] = [];
    data.forEach((element: any) => {
      arr.push(element.subCategories)
    });
    return arr.flat();
  }

}
