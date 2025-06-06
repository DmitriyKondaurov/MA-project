import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/res-api.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  isShow = false;

  @Input() card: any

  constructor(private RestApiService: RestApiService, private element: ElementRef) { }

  ngOnInit(): void {
  }

  show() {
    this.isShow = true;
    this.element.nativeElement.closest('body').style.overflow = 'hidden';
  }

  hide() {
    this.isShow = false;
    this.element.nativeElement.closest('body').style.overflow = 'auto'
  }

  delete(id: any) {
    this.RestApiService.deleteTransaction(id);
  }
}
