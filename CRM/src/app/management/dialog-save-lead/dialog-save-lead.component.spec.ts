import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveLeadComponent } from './dialog-save-lead.component';

describe('DialogSaveLeadComponent', () => {
  let component: DialogSaveLeadComponent;
  let fixture: ComponentFixture<DialogSaveLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSaveLeadComponent]
    });
    fixture = TestBed.createComponent(DialogSaveLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
