import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoringInfoService {

  data: string[] = [];
  archive: object[] = [];
  ar?: any[]
  transitions: object[] = [];

  constructor() { }

  monitoringInfo() {
    if(localStorage.getItem('dataForm')) this.data = JSON.parse(localStorage.getItem('dataForm')!);
    this.makeArchive(this.data);
    this.archive.forEach( (id) => {
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
