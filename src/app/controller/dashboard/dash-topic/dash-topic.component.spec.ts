import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTopicComponent } from './dash-topic.component';

describe('DashTopicComponent', () => {
  let component: DashTopicComponent;
  let fixture: ComponentFixture<DashTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
