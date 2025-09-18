import {isPlatformBrowser, NgOptimizedImage} from '@angular/common';
import {Component, computed, effect, inject, input, OnDestroy, PLATFORM_ID, signal} from '@angular/core';

@Component({
  selector: 'ImageCarousel',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './image-carousel.html',
  styleUrl: './image-carousel.scss'
})
export class ImageCarousel implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;

  slides = input([
    { id: 0, image: "/images/ding-dong3.jpg", caption: "Please change me!!" },
    { id: 1, image: "/images/windBlumeWinter.jpg", caption: "Please change me!!" },
    { id: 2, image: "/images/schildkröte.jpg", caption: "Please change me!!" },
  ]);
  autoPlay = input(true);
  interval = input(5000);
  darkened = input(false);
  manualSwap = input(true);

  currentSlideIndex = signal(0);
  previousSlideIndex = signal(0);
  slideDirection = signal<'next' | 'prev'>('next');
  isAnimating = signal(false);
  isAutoPlayActive = signal(false);

  slidesLength = computed(() => this.slides().length);

  constructor() {
    effect(() => {
      if (this.autoPlay() && isPlatformBrowser(this.platformId)) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });

    effect(() => {
      if (this.autoPlay() && this.isAutoPlayActive()) {
        this.stopAutoPlay();
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    if (!isPlatformBrowser(this.platformId) || this.autoPlayInterval) return;

    this.isAutoPlayActive.set(true);
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval());
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.isAutoPlayActive.set(false);
    }
  }

  nextSlide() {
    if (this.isAnimating()) return;

    this.isAnimating.set(true);
    this.slideDirection.set('next');
    this.previousSlideIndex.set(this.currentSlideIndex());
    this.currentSlideIndex.update(current =>
      (current + 1) % this.slidesLength()
    );

    this.resetAnimation();
  }

  prevSlide() {
    if (this.isAnimating()) return;

    this.isAnimating.set(true);
    this.slideDirection.set('prev');
    this.previousSlideIndex.set(this.currentSlideIndex());
    this.currentSlideIndex.update(current =>
      (current - 1 + this.slidesLength()) % this.slidesLength()
    );

    this.resetAnimation();
  }

  goToSlide(index: number) {
    if (this.isAnimating() || index === this.currentSlideIndex()) return;

    this.isAnimating.set(true);
    this.slideDirection.set(index > this.currentSlideIndex() ? 'next' : 'prev');
    this.previousSlideIndex.set(this.currentSlideIndex());
    this.currentSlideIndex.set(index);

    this.resetAnimation();
  }

  private resetAnimation() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isAnimating.set(false);
      }, 600);
    } else {
      this.isAnimating.set(false);
    }
  }

  getSlideClass(index: number): string {
    const current = this.currentSlideIndex();
    const previous = this.previousSlideIndex();
    const animating = this.isAnimating();
    const direction = this.slideDirection();

    if (index === current) {
      return animating ? 'new-active-slide' : 'active';
    } else if (animating && index === previous) {
      return direction === 'next' ? 'prev-slide' : 'next-slide';
    }
    return '';
  }

  onMouseEnter() {
    if (this.autoPlay()) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave() {
    if (this.autoPlay()) {
      this.startAutoPlay();
    }
  }
}
