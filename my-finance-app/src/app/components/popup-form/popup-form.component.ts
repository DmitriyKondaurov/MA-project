import { RestApiService } from './../../services/res-api.service';
import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/app-interfaces';
import { AuthService } from 'src/app/services/auth.service';

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

  submitted = false;

  isShow = false;

  show() {
    this.isShow = true;
    setTimeout(() => this.hide(), 1000);
  }

  hide() {
    this.isShow = false;
  }

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
    {value: 29, title: 'USD'},
    {value: 30, title: 'EUR'},
    {value: 1, title: 'UAH'},
  ]

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    expense: new FormControl(this.expenses[1], Validators.required),
    date: new FormControl("", Validators.required),
    subCategoryName: new FormControl("", Validators.required),
    categoryName: new FormControl("", Validators.required),
    description: new FormControl(),
    amount: new FormControl('', Validators.required),
    currency: new FormControl(this.currencies[2], Validators.required),
  });


  @Output() handleHide = new EventEmitter();


  constructor(private RestApiService: RestApiService, private element: ElementRef, private auth: AuthService) { }

  handleHideClick(): void {
    this.handleHide.emit();
  }


  ngOnInit(): void {
    this.element.nativeElement.closest('body').style.overflow = 'hidden';
    this.RestApiService.getTransactions();
    this.data = this.RestApiService.getCategories();
    this.RestApiService.getCategories().snapshotChanges().subscribe((res: any) => {
      console.log(res);
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
      this.form.controls['categoryName'].valueChanges.subscribe( category => {
        this.subCategories = this.getSubCategories(this.dataCategories[id], category)
      })
    })
  }

  submitForm(): void {
    this.submitted = true;
    if(this.form.valid) {
      console.log(this.auth.userUid)
      this.RestApiService.addTransaction(this.form.value, this.auth.userUid);
      this.show();
      this.element.nativeElement.closest('body').style.overflow = 'auto';
      this.form.controls['categoryName'].reset();
      this.form.controls['subCategoryName'].reset();
      this.form.controls['description'].reset();
      this.form.controls['amount'].reset();
    }
  }

  get formControl() {
    return this.form.controls;
  }

  getMainCategories(data: any): any {
    let categories: any[] = [];
    Object.values(data).forEach((element: any) => {
      categories.push(Object.values(element)[0]);
    });
    return categories.flat();
  }

  getSubCategories(data: any, category: string) {
    Object.values(data).forEach((element: any) => {
      if (element.categoryName === category) this.subCategories = Object.values(element.subCategories);
    });
    return this.subCategories;
  }
}
