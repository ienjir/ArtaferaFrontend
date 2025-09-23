import {Component, input} from '@angular/core';
import {NgbCarousel, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'ImageCarousel',
  imports: [
    NgbCarouselModule,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss'
})
export class ImageCarousel {
  showNavigation = input<boolean>(true)
  showIndicators = input<boolean>(true)
  pauseOnFocus = input<boolean>(true)
  pauseOnHover = input<boolean>(true)
  interval = input<number>(4000)
  wrap = input<boolean>(true)
  darkened = input<boolean>(false)
  images = input.required<{Link: string, Alt: string, CaptionTitle: string, CaptionSubtitle: string}[]>()
}
