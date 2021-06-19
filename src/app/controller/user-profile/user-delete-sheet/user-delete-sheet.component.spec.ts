import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteSheetComponent } from './user-delete-sheet.component';

describe('UserDeleteSheetComponent', () => {
  let component: UserDeleteSheetComponent;
  let fixture: ComponentFixture<UserDeleteSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeleteSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
