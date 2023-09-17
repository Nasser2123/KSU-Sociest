import { TestBed } from '@angular/core/testing';

import { DepartmentAuthService } from './department-auth.service';

describe('DepartmentAuthService', () => {
  let service: DepartmentAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
