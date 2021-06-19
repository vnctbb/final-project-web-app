import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComModalComponent } from './post-com-modal.component';

describe('PostComModalComponent', () => {
  let component: PostComModalComponent;
  let fixture: ComponentFixture<PostComModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
