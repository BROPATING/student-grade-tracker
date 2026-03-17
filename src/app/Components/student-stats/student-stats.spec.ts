import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStats } from './student-stats';

describe('StudentStats', () => {
  let component: StudentStats;
  let fixture: ComponentFixture<StudentStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
