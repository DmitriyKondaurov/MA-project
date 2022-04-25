import { Categories, Income, Cost } from './../categories';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetObjValuesService {

  constructor() { }

//   getValues (data: Income | Cost) {
//     console.log(data);
//     let keys: string[] = [];
//     Object.values(data[term]).forEach((key,) => {
//       keys.push(key)
//     })
//     keys.forEach( key => {
//       console.log(key);
//     } )
//     console.log(keys)
//     console.log(Object.keys(data.cost))
//   }
}
