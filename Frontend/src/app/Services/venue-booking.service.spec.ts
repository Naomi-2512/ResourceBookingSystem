import { TestBed } from '@angular/core/testing';

import { VenueBookingService } from './venue-booking.service';

describe('VenueBookingService', () => {
  let service: VenueBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
