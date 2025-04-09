import { TestBed } from '@angular/core/testing';

import { ResourceBookingService } from './resource-booking.service';

describe('ResourceBookingService', () => {
  let service: ResourceBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
