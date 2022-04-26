import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-archive',
  templateUrl: './transaction-archive.component.html',
  styleUrls: ['./transaction-archive.component.css']
})
export class TransactionArchiveComponent implements OnInit {

  data: string[] = [];
  archive: object[] = [];
  ar?: any[]
  transitions: object[] = [];

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('dataForm')) this.data = JSON.parse(localStorage.getItem('dataForm')!);
    this.makeArchive(this.data);
    this.archive.forEach( (id) => {
      this.ar = Object.values(id)
      if (Object.values(this.ar['1']).includes('actual')) this.transitions.push(id)
    } )
  }

  makeArchive(data: string[]) {
    data.forEach( (item: string) => {
      this.archive.push(JSON.parse(item));
    })
  }
}
