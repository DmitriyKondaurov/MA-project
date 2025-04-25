import { Pipe, PipeTransform } from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";

@Pipe({
  name: 'transactFilterReduceSort'
})
export class TransactFilterPipe implements PipeTransform {
  constructor(private transactionsService: TransactionsService) { }

  transform(value: ITransactArchive[], flow: string, planFact: string, date?: Date): ITransactArchive[] {
    value = this.transactionsService.customReduce(value, flow, planFact, date);
    return this.transactionsService.customSort(value);
  }

}
