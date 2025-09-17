import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '@components/footer/footer';

@Component({
  selector: 'DefaultLayout',
  imports: [
    RouterOutlet,
    Footer
  ],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.scss'
})
export class DefaultLayout {
}
