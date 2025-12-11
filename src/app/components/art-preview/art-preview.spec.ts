import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtPreview } from './art-preview';

describe('ArtPreview', () => {
  let component: ArtPreview;
  let fixture: ComponentFixture<ArtPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
