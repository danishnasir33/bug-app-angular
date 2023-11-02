import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBugModalComponent } from './new-bug-modal.component';

describe('NewBugModalComponent', () => {
  let component: NewBugModalComponent;
  let fixture: ComponentFixture<NewBugModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBugModalComponent]
    });
    fixture = TestBed.createComponent(NewBugModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
