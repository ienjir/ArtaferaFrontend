import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCarousel } from './picture-carousel';

describe('PictureCarousel', () => {
  let component: ImageCarousel;
  let fixture: ComponentFixture<ImageCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
