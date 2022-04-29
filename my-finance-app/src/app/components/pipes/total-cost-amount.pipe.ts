import { Pipe, PipeTransform } from '@angular/core';
import {ITransactArchive} from "../../app-interfaces";

@Pipe({
  name: 'totalCostAmount'
})
export class TotalCostAmountPipe implements PipeTransform {

  transform(value: ITransactArchive[]): number {
    return  value.reduce((acc, curr) => {
      const currDate = new Date();
      if (curr.flowDirection === 'Расходы'
        && curr.planFact === 'Факт'
      && new Date(curr.date).getMonth() === currDate.getMonth()) {
        return acc += curr.value
      } else return acc
    }, 0);
  }

}
