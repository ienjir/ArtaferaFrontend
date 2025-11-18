import {Component, input} from '@angular/core';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';
import {environment} from "@environments/environment";
import {ArtPicture} from "@interfaces/art-picture.model";

@Component({
  selector: 'AF-Picture-Carousel',
  imports: [
    NgbCarouselModule,
    NgOptimizedImage,
  ],
  templateUrl: './picture-carousel.html',
  styleUrl: './picture-carousel.scss'
})
export class PictureCarousel {
  showNavigation = input<boolean>(true)
  showIndicators = input<boolean>(true)
  pauseOnFocus = input<boolean>(true)
  pauseOnHover = input<boolean>(true)
  interval = input<number>(4000)
  wrap = input<boolean>(true)
  darkened = input<boolean>(false)
  pictures = input<ArtPicture[]>()
  basePictureURL = input(environment.pictureUrl)

  pictureUrl(picture: ArtPicture | undefined) {
    const pic = picture?.picture;
    return pic ? `${this.basePictureURL()}/${pic.name}${pic.type}` : '';
  }
}
