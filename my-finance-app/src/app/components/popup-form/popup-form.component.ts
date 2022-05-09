import { RestApiService } from '../../services/res-api.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Type {
  value: 'costs' | 'income',
  title: string,
  id: number
}
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})

export class PopupFormComponent implements OnInit {

  data?: any;
  dataStorage?: string[] = [];
  dataCategories: any = [];


  types: Type[] = [
    {value: 'costs', title: 'consumption', id: 0},
    {value: 'income', title: 'income', id: 1},
  ];

  expenses = [
    {value: 'planned', title: 'planned'},
    {value: 'actual', title: 'actual'},
  ];

  categories: any;
  subCategories: any;

  currencies = [
    {value: 29, title: 'Dollar'},
    {value: 30, title: 'Euro'},
    {value: 1, title: 'Hryvnia'},
  ]

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    expense: new FormControl(this.expenses[1], Validators.required),
    date: new FormControl("", Validators.required),
    subCategory: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    description: new FormControl(),
    amount: new FormControl( Validators.required),
    currency: new FormControl(this.currencies[2], Validators.required),
  });


  @Output() handleHide = new EventEmitter();


  constructor(private RestApiService: RestApiService) { }

  handleHideClick(): void {
    this.handleHide.emit();
  }


  ngOnInit(): void {
    this.RestApiService.getTransactions();
    this.data = this.RestApiService.getCategories();
    this.RestApiService.getCategories().snapshotChanges().subscribe((res: any) => {
      res.forEach( (category: any) => {
        this.dataCategories.push(category.payload.toJSON());
      } )
    })

    const dateControl = document.querySelector('[data-date-input]') as HTMLInputElement ;
    this.form.controls['expense'].valueChanges.subscribe( ({ value }) => {
      if (value === 'planned') dateControl.type = 'month'
      else dateControl.type = 'date';
    })
    this.form.controls['type'].valueChanges.subscribe( ({ id }: Type) => {
      if(!this.dataCategories) return;
      this.categories = this.getMainCategories(this.dataCategories[id]);
      this.form.controls['category'].valueChanges.subscribe( category => {
        this.subCategories = this.getSubCategories(this.dataCategories[id], category)
        console.log(this.subCategories);
      })
    })
  }

  submitForm(): void {
    if(this.form.valid) this.RestApiService.addTransaction(this.form.value);
  }

  getMainCategories(data: any): any {
    let categories: any[] = [];
    Object.values(data).forEach((element: any) => {
      categories.push(Object.values(element)[0]);
    });
    return categories.flat();
  }

  getSubCategories(data: any, category: string) {
    let subCategories: any[] = [];
    Object.values(data).forEach((element: any) => {
      if (element.categoryName === category) this.subCategories = Object.values(element.subCategories);
    });
    return this.subCategories;
  }
}
