import {Component, inject, PLATFORM_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '@components/footer/footer';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-home-layout',
  imports: [
    RouterOutlet,
    Footer,
    TranslocoPipe
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.scss'
})
export class HomeLayout {
  private platformId = inject(PLATFORM_ID);

  scrollToNavbar() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('NavigationBar');
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
}
