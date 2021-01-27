import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public className:string = 'light';
  public show:boolean = false;
  title = 'assignment2';
  constructor() {}

  ngOnInit(){}

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.className = 'dark'
    } else {
      this.className = 'light';
    }
  }
}
