import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookedComponent } from './user-booked.component';

describe('UserBookedComponent', () => {
  let component: UserBookedComponent;
  let fixture: ComponentFixture<UserBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
