import { Component } from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'NavigationBar',
  imports: [
    TranslocoPipe
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss'
})
export class NavigationBar {
  openSidebar = false;

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }
}
