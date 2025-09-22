import { Component } from '@angular/core';
import {NgbCarousel, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'ImageCarousel',
  imports: [
    NgbCarouselModule,
    NgOptimizedImage
  ],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss'
})
export class ImageCarousel {
  images = [944, 911, 922].map((n) => `https://picsum.photos/id/${n}/4000/2000`);
}
