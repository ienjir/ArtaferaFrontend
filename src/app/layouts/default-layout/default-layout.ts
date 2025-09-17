import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '@components/footer/footer';
import {NavigationBar} from '@app/navigation-bar/navigation-bar';

@Component({
  selector: 'DefaultLayout',
  imports: [
    RouterOutlet,
    Footer,
    NavigationBar
  ],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.scss'
})
export class DefaultLayout {
}
