import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicmessageModalComponent } from './update-topicmessage-modal.component';

describe('UpdateTopicmessageModalComponent', () => {
  let component: UpdateTopicmessageModalComponent;
  let fixture: ComponentFixture<UpdateTopicmessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTopicmessageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTopicmessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
