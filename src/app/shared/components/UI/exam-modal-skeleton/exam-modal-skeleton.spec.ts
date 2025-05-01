import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamModalSkeletonComponent } from './exam-modal-skeleton';

describe('ExamModalSkeletonComponent', () => {
  let component: ExamModalSkeletonComponent;
  let fixture: ComponentFixture<ExamModalSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamModalSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamModalSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
