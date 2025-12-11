import {Component, computed, input} from '@angular/core';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {ArtPicture} from "@interfaces/art-picture.model";
import {TranslocoPipe} from "@jsverse/transloco";
import {NgxSkeletonLoaderComponent} from "ngx-skeleton-loader";
import { Picture } from '@components/picture/picture';

@Component({
  selector: 'AF-Picture-Carousel',
  imports: [
    NgbCarouselModule,
    Picture,
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
  basePictureURL = input<string>()
}
