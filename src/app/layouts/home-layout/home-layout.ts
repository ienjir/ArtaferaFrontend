import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '@components/footer/footer';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser, NgOptimizedImage} from '@angular/common';
import {NavigationBar} from '@components//navigation-bar/navigation-bar';
import {ImageCarousel} from '@components/image-carousel/image-carousel';

@Component({
  selector: 'app-home-layout',
  imports: [
    RouterOutlet,
    Footer,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel,
    NgOptimizedImage
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

  images: { Link: string, Alt: string, CaptionTitle: string, CaptionSubtitle: string }[] = [
    {Link: "/images/ding-dong3.jpg", Alt: "Ding Dong", CaptionTitle: "", CaptionSubtitle: ""},
    {Link: "/images/schildkröte.jpg", Alt: "Schidkröte", CaptionTitle: "", CaptionSubtitle: ""},
    {Link: "/images/windBlumeWinter.jpg", Alt: "Windblume", CaptionTitle: "", CaptionSubtitle: ""}
  ]
}
