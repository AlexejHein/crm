import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCostumerComponent } from './dialog-add-costumer.component';

describe('DialogAddCostumerComponent', () => {
  let component: DialogAddCostumerComponent;
  let fixture: ComponentFixture<DialogAddCostumerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddCostumerComponent]
    });
    fixture = TestBed.createComponent(DialogAddCostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
