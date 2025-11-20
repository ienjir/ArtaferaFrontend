import {Component, computed, input} from '@angular/core';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';
import {environment} from "@environments/environment";
import {ArtPicture} from "@interfaces/art-picture.model";
import {TranslocoPipe} from "@jsverse/transloco";
import {NgxSkeletonLoaderComponent} from "ngx-skeleton-loader";

@Component({
  selector: 'AF-Picture-Carousel',
  imports: [
    NgbCarouselModule,
    NgOptimizedImage,
    TranslocoPipe,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './picture-carousel.html',
  styleUrl: './picture-carousel.scss',
  standalone: true
})
export class PictureCarousel {
  showNavigation = input<boolean>(true)
  showIndicators = input<boolean>(true)
  pauseOnFocus = input<boolean>(true)
  pauseOnHover = input<boolean>(true)
  interval = input<number>(4000)
  wrap = input<boolean>(true)
  darkened = input<boolean>(false)
  isLoading = input<boolean>(false)
  pictures = input<ArtPicture[]>([])
  hasPictures = computed(() => this.pictures()?.length > 1)
  basePictureURL = input(environment.pictureUrl)

  pictureUrl(picture: ArtPicture | undefined) {
    const pic = picture?.picture;
    return pic ? `${this.basePictureURL()}/${pic.name}${pic.type}` : '';
  }

  test() {
    console.log(this.pictures())
    console.log(this.hasPictures())
    console.log(this.pictures()?.length)
  }
}
