import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseModalBtnComponent } from './close-modal-btn.component';

describe('CloseModalBtnComponent', () => {
  let component: CloseModalBtnComponent;
  let fixture: ComponentFixture<CloseModalBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseModalBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseModalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
