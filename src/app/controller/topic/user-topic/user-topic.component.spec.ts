import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTopicComponent } from './user-topic.component';

describe('UserTopicsComponent', () => {
  let component: UserTopicComponent;
  let fixture: ComponentFixture<UserTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
