import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transition-archive',
  templateUrl: './transition-archive.component.html',
  styleUrls: ['./transition-archive.component.css']
})
export class TransitionArchiveComponent implements OnInit {

  data: string[] = [];
  archive: object[] = [];
  ar?: any[]

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('dataForm')) this.data = JSON.parse(localStorage.getItem('dataForm')!);
    this.makeArchive(this.data);
    console.log(this.archive)
    this.archive.forEach( (id) => {
      this.ar = Object.values(id)
      console.log(this.ar)
    } )
  }

  makeArchive(data: string[]) {
    data.forEach( (item: string) => {
      this.archive.push(JSON.parse(item));
    })
  }
}
