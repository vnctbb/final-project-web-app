import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcomUpdateModalComponent } from './postcom-update-modal.component';

describe('PostcomUpdateModalComponent', () => {
  let component: PostcomUpdateModalComponent;
  let fixture: ComponentFixture<PostcomUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcomUpdateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcomUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
