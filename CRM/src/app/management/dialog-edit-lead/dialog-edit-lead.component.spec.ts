import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLeadComponent } from './dialog-edit-lead.component';

describe('DialogEditLeadComponent', () => {
  let component: DialogEditLeadComponent;
  let fixture: ComponentFixture<DialogEditLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditLeadComponent]
    });
    fixture = TestBed.createComponent(DialogEditLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
