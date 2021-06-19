import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcomModalComponent } from './postcom-modal.component';

describe('PostcomModalComponent', () => {
  let component: PostcomModalComponent;
  let fixture: ComponentFixture<PostcomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcomModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
