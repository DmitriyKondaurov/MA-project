import { Pipe, PipeTransform } from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";
import {TransactionsService} from "../../services/transactions.service";

@Pipe({
  name: 'transactFilterReduceSort'
})
export class TransactFilterPipe implements PipeTransform {
  constructor(private transactionsService: TransactionsService) { }

  transform(value: ITransactArchive[]): ITransactArchive[] {
    value = this.transactionsService.customReduce(value);
    return   value = this.transactionsService.customSort(value);
  }

}
