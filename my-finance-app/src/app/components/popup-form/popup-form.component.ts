import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

  @Output() handleHide = new EventEmitter();

  handleHideClick() {
    this.handleHide.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
