import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundDialogComponent } from './not-found-dialog.component';

describe('NotFoundDialogComponent', () => {
  let component: NotFoundDialogComponent;
  let fixture: ComponentFixture<NotFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
