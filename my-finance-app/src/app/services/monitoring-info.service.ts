import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoringInfoService {

  archive: object[] = [];
  archiveValues?: object[]
  transitions: object[] = [];

  constructor() { }

  monitoringInfo(data: string[]) {
    data.forEach( (el: any) => {
      this.archive.push(JSON.parse(el));
    });
    this.archive.forEach( (id: object) => {
      this.archiveValues = Object.values(id)
      if (Object.values(this.archiveValues['1']).includes('actual')) this.transitions.push(id)
    } )
    return this.transitions;
  }
}
