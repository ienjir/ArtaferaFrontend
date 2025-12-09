import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsgPage } from './dsg-page';

describe('DsgPage', () => {
  let component: DsgPage;
  let fixture: ComponentFixture<DsgPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsgPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
