import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderCardComponent } from './loader-card.component';

describe('LoaderCardComponent', () => {
  let component: LoaderCardComponent;
  let fixture: ComponentFixture<LoaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
