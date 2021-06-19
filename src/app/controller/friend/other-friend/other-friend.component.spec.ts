import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFriendComponent } from './other-friend.component';

describe('OtherFriendComponent', () => {
  let component: OtherFriendComponent;
  let fixture: ComponentFixture<OtherFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
