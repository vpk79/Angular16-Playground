import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showSecret: boolean = false;
  arr: number[] = [];
  counter: number = 0;
  blue = {background: 'blue'}
  white= 'white';

  onToggleDisplay() {
    this.showSecret = !this.showSecret;
    this.counter++;
    this.arr.push(this.counter);
  }

}
