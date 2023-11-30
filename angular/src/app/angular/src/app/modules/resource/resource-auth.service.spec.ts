import { TestBed } from '@angular/core/testing';

import { ResourceAuthService } from './resource-auth.service';

describe('ResourceAuthService', () => {
  let service: ResourceAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
