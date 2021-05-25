import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourgamesComponent } from './yourgames.component';

describe('YourgamesComponent', () => {
  let component: YourgamesComponent;
  let fixture: ComponentFixture<YourgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
