import { Injectable } from '@angular/core';
import { RestApiService } from '../services/res-api.service'

@Injectable({
  providedIn: 'root'
})
export class MonitoringInfoService {

  archive: object[] = [];
  ar?: any[]
  transitions: object[] = [];

  constructor(private RestApiService: RestApiService) { }

  monitoringInfo(data: string[]) {
    data.forEach( (el: any) => {
      this.archive.push(JSON.parse(el));
    });
    this.archive.forEach( (id: object) => {
      this.ar = Object.values(id)
      if (Object.values(this.ar['1']).includes('actual')) this.transitions.push(id)
    } )
    return this.transitions;
  }

  makeArchive(data: string[]) {
    data.forEach( (item: string) => {
      this.archive.push(JSON.parse(item));
    })
  }

}
