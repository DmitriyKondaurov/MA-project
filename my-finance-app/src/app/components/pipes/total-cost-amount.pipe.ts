import { Pipe, PipeTransform } from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";

@Pipe({
  name: 'totalCostAmount'
})
export class TotalCostAmountPipe implements PipeTransform {

  transform(value: ITransactArchive[], flow: string, planFact: string, date: Date): number {
    return  value.reduce((acc, curr) => {
      if (curr.type.value === flow
        && curr.expense.value === planFact
      && new Date(curr.date).getMonth() === date.getMonth()) {
        return acc += curr.amount
      } else return acc
    }, 0);
  }

}
