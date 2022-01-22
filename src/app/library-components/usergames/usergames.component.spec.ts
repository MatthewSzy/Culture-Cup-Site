import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergamesComponent } from './usergames.component';

describe('UsergamesComponent', () => {
  let component: UsergamesComponent;
  let fixture: ComponentFixture<UsergamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
