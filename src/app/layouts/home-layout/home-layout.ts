import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '@components/footer/footer';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser, NgOptimizedImage} from '@angular/common';
import {NavigationBar} from '@components//navigation-bar/navigation-bar';
import {PictureCarousel} from '@components/picture-carousel/picture-carousel';
import {ArtPicture} from "@interfaces/art-picture.model";

@Component({
  selector: 'app-home-layout',
  imports: [
    RouterOutlet,
    Footer,
    TranslocoPipe,
    NavigationBar,
    PictureCarousel,
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

  pictures: ArtPicture[] = [
    {id: 0, name: "DingDong", priority: 1, picture: {id: 0, type: ".jpg", is_public: true, name: "DingDong", created_at: Date(), updated_at: Date()}, artId: 0, created_at: Date(), updated_at: Date(), pictureId: 0,},
    {id: 0, name: "Sonnenblume", priority: 2, picture: {id: 0, type: ".jpg", is_public: true, name: "Windblume", created_at: Date(), updated_at: Date()}, artId: 0, created_at: Date(), updated_at: Date(), pictureId: 0,},
    {id: 0, name: "Schildkröte", priority: 3, picture: {id: 0, type: ".jpg", is_public: true, name: "Schildkröte", created_at: Date(), updated_at: Date()}, artId: 0, created_at: Date(), updated_at: Date(), pictureId: 0,},
  ]
}
