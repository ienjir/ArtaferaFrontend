import {Component, computed, input} from '@angular/core';
import {NgbCarousel, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {Picture} from "@interfaces/picture.model";
import {environment} from "@environments/environment";
import {ArtPicture} from "@interfaces/art-picture.model";

@Component({
  selector: 'AF-Image-Carousel',
  imports: [
    NgbCarouselModule,
    NgOptimizedImage,
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
  pictures = input.required<ArtPicture[]>()
  basePictureURL = input(environment.pictureUrl)

  pictureUrl(picture: ArtPicture)  {
    const pic = picture.picture;
    return pic ? `${this.basePictureURL()}/${pic.name}${pic.type}` : '';
  }
}
