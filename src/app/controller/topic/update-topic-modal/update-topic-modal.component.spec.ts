import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicModalComponent } from './update-topic-modal.component';

describe('UpdateTopicModalComponent', () => {
  let component: UpdateTopicModalComponent;
  let fixture: ComponentFixture<UpdateTopicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTopicModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
