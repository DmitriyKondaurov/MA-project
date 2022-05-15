import { Component, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-finance-app';

  isShow = false;

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
    this.element.nativeElement.closest('body').style.overflow = 'auto'
  }

  constructor(private element: ElementRef, public auth: AuthService) {}
  ngOnInit() {

  }

}
