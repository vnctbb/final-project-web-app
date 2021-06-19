import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureModalComponent } from './profile-picture-modal.component';

describe('ProfilePictureModalComponent', () => {
  let component: ProfilePictureModalComponent;
  let fixture: ComponentFixture<ProfilePictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePictureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
