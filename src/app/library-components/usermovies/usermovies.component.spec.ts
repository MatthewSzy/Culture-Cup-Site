import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermoviesComponent } from './usermovies.component';

describe('UsermoviesComponent', () => {
  let component: UsermoviesComponent;
  let fixture: ComponentFixture<UsermoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
