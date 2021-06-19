import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMessageModalComponent } from './topic-message-modal.component';

describe('TopicMessageModalComponent', () => {
  let component: TopicMessageModalComponent;
  let fixture: ComponentFixture<TopicMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicMessageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
