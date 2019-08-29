import { TestBed } from '@angular/core/testing';

import { GetpostService } from './getpost.service';

describe('GetpostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetpostService = TestBed.get(GetpostService);
    expect(service).toBeTruthy();
  });
});
