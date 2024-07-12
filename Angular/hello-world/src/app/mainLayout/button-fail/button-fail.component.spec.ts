import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFailComponent } from './button-fail.component';

describe('ButtonFailComponent', () => {
  let component: ButtonFailComponent;
  let fixture: ComponentFixture<ButtonFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
