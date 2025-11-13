import { TestBed } from '@angular/core/testing';

import { Art } from './art';

describe('Art', () => {
  let service: Art;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Art);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
