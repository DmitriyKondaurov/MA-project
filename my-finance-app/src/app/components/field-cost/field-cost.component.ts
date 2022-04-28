import {Component, Input, OnInit} from '@angular/core';
import {ICostArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";

@Component({
  selector: 'app-field-cost',
  templateUrl: './field-cost.component.html',
  styleUrls: ['./field-cost.component.css']
})
export class FieldCostComponent implements OnInit {
  @Input() transactions: ICostArchive[] = [];
  firstBiggest: ICostArchive[] = [];
  totalCostAmount: number = 0;
constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.totalCostAmount = this.transactions.reduce((acc, curr) => acc += curr.value, 0)
    this.transactions = this.transactionsService.customReduce(this.transactions);
    this.transactions = this.transactionsService.customSort(this.transactions);
    this.firstBiggest = this.transactions.slice(0, 5)
  }

}
