import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncronizeComponent } from './syncronize.component';

describe('SyncronizeComponent', () => {
  let component: SyncronizeComponent;
  let fixture: ComponentFixture<SyncronizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyncronizeComponent]
    });
    fixture = TestBed.createComponent(SyncronizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
