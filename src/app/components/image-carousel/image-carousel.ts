import {isPlatformBrowser, NgClass, NgForOf, NgIf} from '@angular/common';
import {Component, inject, Input, PLATFORM_ID} from '@angular/core';

@Component({
  selector: 'ImageCarousel',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss'
})
export class ImageCarousel {
  private platformId = inject(PLATFORM_ID);

  currentSlideIndex = 0;
  previousSlideIndex = 0;
  slideDirection = 'next';
  isAnimating = false;
  autoPlayInterval: any;

  @Input() slides: { image: string, caption: string }[] = [
    {image: "/images/ding-dong3.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
    {image: "/images/windBlumeWinter.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
    {image: "/images/schildkröte.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
  ];
  @Input() autoPlay = true;
  @Input() interval = 5000;
  @Input() darkened = false;
  @Input() manualSwap = true;

  ngOnInit() {
    // Only start autoplay in browser environment
    if (this.autoPlay && isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    // Guard against SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopAutoPlay() {
    // Guard against SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.slideDirection = 'next';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;

    // Guard setTimeout for SSR
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    } else {
      // In SSR, immediately set to false
      this.isAnimating = false;
    }
  }

  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.slideDirection = 'prev';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;

    // Guard setTimeout for SSR
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    } else {
      // In SSR, immediately set to false
      this.isAnimating = false;
    }
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.currentSlideIndex) return;
    this.isAnimating = true;
    this.slideDirection = index > this.currentSlideIndex ? 'next' : 'prev';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = index;

    // Guard setTimeout for SSR
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    } else {
      // In SSR, immediately set to false
      this.isAnimating = false;
    }
  }

  getSlideClass(index: number) {
    if (index === this.currentSlideIndex) {
      return 'active';
    } else if (this.isAnimating && index === this.previousSlideIndex) {
      return this.slideDirection === 'next' ? 'prev-slide' : 'next-slide';
    } else if (this.isAnimating && index === this.currentSlideIndex) {
      return 'new-active-slide';
    }
    return '';
  }

  // Track mouse events to pause auto-play when user interacts with carousel
  onMouseEnter() {
    if (this.autoPlay && isPlatformBrowser(this.platformId)) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave() {
    if (this.autoPlay && isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    // Always try to stop autoplay, but guard the clearInterval call
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoPlay();
    }
  }

}
