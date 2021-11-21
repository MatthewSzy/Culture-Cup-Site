import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourmoviesComponent } from './yourmovies.component';

describe('YourmoviesComponent', () => {
  let component: YourmoviesComponent;
  let fixture: ComponentFixture<YourmoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourmoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
