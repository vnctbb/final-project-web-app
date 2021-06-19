import { TestBed } from '@angular/core/testing';

import { PostcomService } from './postcom.service';

describe('PostcomService', () => {
  let service: PostcomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostcomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
