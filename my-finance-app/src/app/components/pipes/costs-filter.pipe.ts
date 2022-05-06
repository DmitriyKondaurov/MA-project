import { Categories } from './../../categories';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costsFilter'
})
export class CostsFilterPipe implements PipeTransform {

  categories: object[] = [];

  transform(arrCategories: object[]): any {

    arrCategories.forEach( (category: object) => {
        if(Object.values(category)[0] != '0') return category
        return
    })
  }

}
