import { Pipe, PipeTransform } from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";

@Pipe({
  name: 'totalCostAmount'
})
export class TotalCostAmountPipe implements PipeTransform {

  transform(value: ITransactArchive[], flow: string, planFact: string, date: Date): number {
    return  value.reduce((acc, curr) => {
      if (curr.flowDirection === flow
        && curr.planFact === planFact
      && new Date(curr.date).getMonth() === date.getMonth()) {
        return acc += curr.value
      } else return acc
    }, 0);
  }

}
